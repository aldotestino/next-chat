import React from 'react';
import { Separator } from './ui/separator';
import UserAvatar from './user-avatar';

function ChatNavbar({ name, image }: {name: string, image?: string}) {
  return (
    <div>
      <div className="p-4 bg-muted flex items-center gap-4">
        <UserAvatar imageUrl={image} userHandle={name} />
        <p className="text-lg font-semibold">{name}</p>
      </div>
      <Separator />
    </div>
  );
}

export default ChatNavbar;