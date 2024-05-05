import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

function ChatNavbar({ name, image }: {name: string, image?: string}) {
  return (
    <div>
      <div className="p-4 bg-muted flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <p className="text-lg font-semibold">{name}</p>
      </div>
      <Separator />
    </div>
  );
}

export default ChatNavbar;