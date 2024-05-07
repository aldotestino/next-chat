import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function UserAvatar({ imageUrl, userHandle }: {imageUrl?: string, userHandle: string}) {
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage src={imageUrl} alt={userHandle} />
      <AvatarFallback>{userHandle[0]}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;