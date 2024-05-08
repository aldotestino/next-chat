'use client';

import Message, { MessageFallback } from './message';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChat } from '@/server/actions';

function Messages({ chatId }: {chatId: string}) {

  const { data } = useQuery({
    queryKey: [`chat:${chatId}}`],
    queryFn: async () => getChat({ chatId: parseInt(chatId) }),
  });

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(chatRef.current) 
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [data]);

  return (
    <div ref={chatRef} className='flex flex-col gap-2 p-4 overflow-y-auto'>
      {data?.data?.messages.map((message, i) => (
        <Message key={message.id} message={message} nextCreatedAt={data!.data!.messages[i+1]?.createdAt} nextIsMine={data!.data!.messages[i+1]?.isMine} />
      ))}
    </div>
  );
}

export function MessagesFallback() {
  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto'>
      {Array.from({ length: 5 }).map((_, i) => (
        <MessageFallback key={i} />
      ))}
    </div>
  );
}

export default Messages;