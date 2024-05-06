import React from 'react';
import { Separator } from './ui/separator';
import { UserButton } from '@clerk/nextjs';
import ChatList, { ChatListFallback } from './chat-list';
import { Button } from './ui/button';
import { SquarePen } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { getChats } from '@/server/query';
import CreateChat from './create-chat';

async function ChatSidebar() {

  const chats = await getChats();

  console.log(chats);
  
  return (
    <aside className="w-80 border-r shadow-md grid grid-rows-[auto,1fr] overflow-y-hidden">
      <div>
        <div className="p-4 flex items-center justify-between gap-2">
          <UserButton appearance={{
            elements:{
              avatarBox:'h-10 w-10'
            }
          }}/>
          <CreateChat />
        </div>
        <Separator />
      </div>
      <ChatList chats={chats} />
    </aside>
  );
}

export function ChatSidebarFallback() {

  return (
    <aside className="w-80 border-r shadow-md grid grid-rows-[auto,1fr] overflow-y-hidden">
      <div>
        <div className="p-4 flex items-center justify-between gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Button variant="secondary" size="icon">
            <SquarePen className="w-4 h-4" />
          </Button>
        </div>
        <Separator />
      </div>
      <ChatListFallback />
    </aside>
  );
}

export default ChatSidebar;