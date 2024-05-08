'use client';

import { MessageT } from '@/lib/types';
import Message, { MessageFallback } from './message';
import { useEffect, useRef } from 'react';

function Chat({ messages }: {messages: MessageT[]}) {

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(chatRef.current) 
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={chatRef} className='flex flex-col gap-2 p-4 overflow-y-auto'>
      {messages.map((message, i) => (
        <Message key={message.id} message={message} nextCreatedAt={messages[i+1]?.createdAt} nextIsMine={messages[i+1]?.isMine} />
      ))}
    </div>
  );
}

export function ChatFallback() {
  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto'>
      {Array.from({ length: 5 }).map((_, i) => (
        <MessageFallback key={i} />
      ))}
    </div>
  );
}

export default Chat;