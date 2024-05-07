import React from 'react';
import { Separator } from './ui/separator';
import UserAvatar from './user-avatar';
import { User } from '@/lib/types';
import { getUserHandle } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

function ChatNavbar({ user }: {user: User}) {
  return (
    <div>
      <div className="p-4 flex items-center gap-4">
        <UserAvatar imageUrl={user.image || undefined} userHandle={getUserHandle(user)} />
        <p className="text-lg font-semibold">{getUserHandle(user)}</p>
      </div>
      <Separator />
    </div>
  );
}

export default ChatNavbar;

export function ChatNavbarFallback() {
  return (
    <div>
      <div className="p-4 flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-40 h-4" />
      </div>
      <Separator />
    </div>
  );
}