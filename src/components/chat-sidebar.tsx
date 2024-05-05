import React from 'react';
import { Separator } from './ui/separator';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';

async function ChatSidebar() {

  const user = await currentUser();

  const userHandle = user?.username || `${user?.firstName} ${user?.lastName}` || user?.emailAddresses[0].emailAddress || '';

  return (
    <aside className="w-80 border-r shadow-md grid grid-rows-[auto,1fr] overflow-y-hidden">
      <div>
        <div className="p-4 flex items-center gap-2">
          <UserButton appearance={{
            elements:{
              avatarBox:'h-10 w-10'
            }
          }}/>
          <p className='text-muted-foreground text-lg font-semibold'>{userHandle}</p>
        </div>
        <Separator />
      </div>
      <div className="h-full overflow-y-auto divide-y">
        {Array.from({ length: 20 }).map((_, index) => (
          <Link key={index} href={`/chat/p/${index}`} className="block p-4 hover:bg-muted">Chat{index}</Link>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar;