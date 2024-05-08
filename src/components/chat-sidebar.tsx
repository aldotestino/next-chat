import React from 'react';
import { Separator } from './ui/separator';
import { UserButton } from '@clerk/nextjs';
import ChatList, { ChatListFallback } from './chat-list';
import { Button } from './ui/button';
import { SquarePen } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { getChats } from '@/server/actions';
import CreateChatDialog from './create-chat-dialog';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

async function ChatSidebar() {
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  });
  
  return (
    <aside className="w-80 border-r shadow-md grid grid-rows-[auto,1fr] overflow-y-hidden">
      <div>
        <div className="p-4 flex items-center justify-between gap-2">
          <UserButton appearance={{
            elements:{
              avatarBox:'h-10 w-10'
            }
          }}/>
          <CreateChatDialog />
        </div>
        <Separator />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatList />
      </HydrationBoundary>
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