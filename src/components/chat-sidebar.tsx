import React from 'react';
import { Separator } from './ui/separator';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Input } from './ui/input';
import ChatPreview from './chat-preview';
import Chats from './chats';
// import { currentUser } from '@clerk/nextjs/server';

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

  // const user = await currentUser();

  // const userHandle = user?.username || `${user?.firstName} ${user?.lastName}` || user?.emailAddresses[0].emailAddress || '';

  return (
    <aside className="w-80 border-r shadow-md grid grid-rows-[auto,auto,1fr] overflow-y-hidden">
      <div>
        <div className="p-4 flex items-center gap-2">
          <UserButton appearance={{
            elements:{
              avatarBox:'h-10 w-10'
            }
          }}/>
          {/* <p className='text-muted-foreground text-lg font-semibold'>{userHandle}</p> */}
        </div>
        <Separator />
      </div>
      <Chats chats={chats} />
    </aside>
  );
}

export default ChatSidebar;