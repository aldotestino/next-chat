'use server';
import db from '@/db';
import { chat, message } from '@/db/schema';
import { getHandle } from '@/lib/utils';
import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { desc, eq, or } from 'drizzle-orm';

export async function searchForUser(searchString: string) {

  // if search string is empty, return an empty array
  if (!searchString.trim()) {
    return [];
  }

  const user = await currentUser();

  const users = await clerkClient.users.getUserList();

  const cleanUsers = users.data.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  })).filter((u) => u.id !== user?.id);

  return cleanUsers.filter((user) => {
    const username = getHandle(user);
    return username.toLowerCase().includes(searchString.toLowerCase());
  });
}

export async function getChats() {
  const user = await currentUser();

  const rawChats = await db.query.chat.findMany({
    where: or(eq(chat.userId1, user!.id), eq(chat.userId2, user!.id)),
    with: {
      messages: {
        orderBy: desc(message.createdAt),
        limit: 1,
        columns: {
          content: true,
          createdAt: true,
        },
      }
    }
  });

  const chats = Promise.all(
    rawChats.map(async (chat) => {
      const otherUserId = chat.userId1 === user!.id ? chat.userId2 : chat.userId1;
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

  return chats;
}