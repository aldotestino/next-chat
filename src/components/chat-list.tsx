'use client';

import { useMemo, useState } from 'react';
import ChatPreview, { ChatPreviewFallback } from './chat-preview';
import { Input } from './ui/input';
import { useParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { getUserHandle } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getChats } from '@/server/actions';

function ChatList() {

  const { data } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => getChats({}),
  });

  const params = useParams<{ type: string; id: string }>();
  const [searchTerm, setsearchTerm] = useState('');

  const filteredChats = useMemo(() => {
    if(!data || !data.data)
      return [];
    return data.data.filter(c => getUserHandle(c.user).toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  return (
    <div className="h-full grid grid-rows-[auto,1fr] overflow-y-hidden">
      <div className="p-4 flex gap-4 items-center">
        <Input placeholder="Search" onChange={e => setsearchTerm(e.target.value)} className='pl-8' />
        <Search className="w-4 h-4 absolute left-6 text-muted-foreground" />
      </div>
      <div className="h-full overflow-y-auto divide-y">
        {filteredChats.map(c => (
          <ChatPreview key={c.id} chat={c} selected={parseInt(params.id) === c.id} />
        ))}
      </div>
    </div>
  );
}

export function ChatListFallback() {
  return (
    <div className="h-full overflow-auto divide-y">
      {Array.from({ length: 4 }).map((_, i) => (
        <ChatPreviewFallback key={i} />
      ))}
    </div>
  );
}

export default ChatList;