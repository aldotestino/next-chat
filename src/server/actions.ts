'use server';

import db from '@/db';
import { chat } from '@/db/schema';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPersonalChat(userId: string) {

  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await currentUser();

  const user2 = await clerkClient.users.getUser(userId);

  if (!user2) {
    throw new Error('User not found');
  }

  const newChat = await db.insert(chat).values({
    userId1: user!.id,
    userId2: user2.id,
  }).returning();

  console.log('newChat', newChat[0]);

  revalidatePath('/chat');
  redirect(`/chat/p/${newChat[0].id}`);
}