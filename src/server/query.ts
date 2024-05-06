'use server';
import { currentUser, clerkClient } from '@clerk/nextjs/server';

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
    image: user.hasImage ? user.imageUrl : null,
    firstName: user.firstName,
    lastName: user.lastName,
  })).filter((u) => u.id !== user?.id);

  return cleanUsers.filter((user) => {
    const username = user.username || `${user.firstName} ${user.lastName}` || user.email;
    return username.toLowerCase().includes(searchString.toLowerCase());
  });
}