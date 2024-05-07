'use server';

import db from '@/db';
import * as z from 'zod';
import { chat, message } from '@/db/schema';
import { authAction } from '@/lib/safe-actions';
import { getUserHandle } from '@/lib/utils';
import { clerkClient } from '@clerk/nextjs/server';
import { desc, eq, or, and, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const searchForUserSchema = z.object({
  searchTerm: z.string().min(1),
});

export const searchForUser = authAction(searchForUserSchema, async ({ searchTerm }, { user }) => {

  const users = await clerkClient.users.getUserList();

  const rawChats = await db.query.chat.findMany({
    where: or(eq(chat.userId1, user.id), eq(chat.userId2, user.id)),
    columns: {
      userId1: true,
      userId2: true,
    }
  });

  const chats = rawChats.map((c) => c.userId1 === user.id ? c.userId2 : c.userId1);

  // Filter out the current user and users that are already in chats
  const cleanUsers = users.data.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  })).filter((u) => u.id !== user.id && !chats.includes(u.id));

  return cleanUsers.filter((user) => {
    const username = getUserHandle(user);
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });
});

export const getChats = authAction(z.object({}), async (_, { user }) => {

  const rawChats = await db.query.chat.findMany({
    where: or(eq(chat.userId1, user!.id), eq(chat.userId2, user.id)),
    with: {
      messages: {
        orderBy: desc(message.createdAt),
        limit: 1,
        columns: {
          content: true,
          createdAt: true,
        }
      }
    }
  });

  const chats = await Promise.all(
    rawChats.map(async (chat) => {
      const otherUserId = chat.userId1 === user.id ? chat.userId2 : chat.userId1;
      const otherUser = await clerkClient.users.getUser(otherUserId);

      return {
        id: chat.id,
        user: {
          id: otherUserId,
          username: otherUser.username,
          email: otherUser.emailAddresses[0].emailAddress,
          image: otherUser.imageUrl,
          firstName: otherUser.firstName,
          lastName: otherUser.lastName,
        },
        lastMessage: chat.messages.length > 0 ? chat.messages[0] : null,
      };
    }));

  // Sort by last message date
  chats.sort((a, b) => {
    if (!a.lastMessage) {
      return 1;
    }
    if (!b.lastMessage) {
      return -1;
    }
    return b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime();
  });

  return chats;
});

const createPersonalChatSchema = z.object({
  userId: z.string(),
});

export const createPersonalChat = authAction(createPersonalChatSchema, async ({ userId }, { user }) => {

  const user2 = await clerkClient.users.getUser(userId);

  if (!user2) {
    throw new Error('User not found');
  }

  const newChat = await db.insert(chat).values({
    userId1: user.id,
    userId2: user2.id,
  }).returning();

  revalidatePath('/chat');
  redirect(`/chat/p/${newChat[0].id}`);
});

const getChatSchema = z.object({
  chatId: z.number(),
});

export const getChat = authAction(getChatSchema, async ({ chatId }, { user }) => {

  const personalChat = await db.query.chat.findFirst({
    where: and(eq(chat.id, chatId), or(eq(chat.userId1, user.id), eq(chat.userId2, user.id))),
    with: {
      messages: {
        orderBy: asc(message.createdAt),
        columns: {
          id: true,
          content: true,
          createdAt: true,
          userId: true,
        }
      }
    }
  });

  if (!personalChat) {
    redirect('/chat');
  }

  const otherUserId = personalChat.userId1 === user.id ? personalChat.userId2 : personalChat.userId1;
  const otherUser = await clerkClient.users.getUser(otherUserId);

  return {
    id: personalChat.id,
    user: {
      id: otherUserId,
      username: otherUser.username,
      email: otherUser.emailAddresses[0].emailAddress,
      image: otherUser.imageUrl,
      firstName: otherUser.firstName,
      lastName: otherUser.lastName,
    },
    messages: personalChat.messages.map((m) => ({
      id: m.id,
      content: m.content,
      createdAt: m.createdAt,
      isMine: m.userId === user.id,
    })),
  };
});

const sendMessageSchema = z.object({
  chatId: z.number(),
  content: z.string().min(1),
});

export const sendMessage = authAction(sendMessageSchema, async ({ chatId, content }, { user }) => {

  const personalChat = await db.query.chat.findFirst({
    where: and(eq(chat.id, chatId), or(eq(chat.userId1, user.id), eq(chat.userId2, user.id)))
  });

  if (!personalChat) {
    throw new Error('Chat not found');
  }

  await db.insert(message).values({
    chatId: personalChat.id,
    userId: user.id,
    content,
  });

  revalidatePath(`/chat/p/${chat.id}`);
});