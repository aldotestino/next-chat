import { currentUser } from '@clerk/nextjs/server';
import { createSafeActionClient } from 'next-safe-action';

export const authAction = createSafeActionClient({
  middleware: async () => {
    const user = await currentUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    return { user };
  }
});