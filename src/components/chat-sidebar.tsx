import React from 'react';
import { Separator } from './ui/separator';
import { UserButton } from '@clerk/nextjs';
import ChatList, { ChatListFallback } from './chat-list';
import { Button } from './ui/button';
import { SquarePen } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { searchForUser } from '@/server/query';
import CreateChat from './create-chat';

const chats = [{
  'id': '1',
  'type': 'p',
  'name': 'John Doe',
  'lastMessage': 'ciao'
}, {
  'id': '2',
  'type': 'p',
  'name': 'Jane Smith',
  'lastMessage': 'Hello there!'
}, {
  'id': '3',
  'type': 'p',
  'name': 'Alex Johnson',
  'lastMessage': 'How\'s it going?'
}, {
  'id': '4',
  'type': 'p',
  'name': 'Emily Brown',
  'lastMessage': 'What are you up to?'
}, {
  'id': '5',
  'type': 'p',
  'name': 'Michael Lee',
  'lastMessage': 'See you later!'
}, {
  'id': '6',
  'type': 'p',
  'name': 'Sophia Garcia',
  'lastMessage': 'Let\'s meet up!'
}, {
  'id': '7',
  'type': 'p',
  'name': 'William Martinez',
  'lastMessage': 'I\'m busy right now.'
}, {
  'id': '8',
  'type': 'p',
  'name': 'Isabella Robinson',
  'lastMessage': 'I\'m on my way.'
}, {
  'id': '9',
  'type': 'p',
  'name': 'Ethan Clark',
  'lastMessage': 'I\'m on my way.'
}, {
  'id': '10',
  'type': 'p',
  'name': 'Olivia Rodriguez',
  'lastMessage': 'I\'m on my way.'
}];

async function ChatSidebar() {
  
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