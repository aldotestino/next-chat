'use client';
import { useMemo, useState } from 'react';
import ChatPreview from './chat-preview';
import { Input } from './ui/input';
import { useParams } from 'next/navigation';
import { Search } from 'lucide-react';

function Chats({ chats }: {chats: {id: string, type: string, name: string, image?: string, lastMessage: string}[]}) {

  const params = useParams<{ type: string; id: string }>();
  const [search, setSearch] = useState('');

  const filteredChats = useMemo(() => {
    return chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [chats, search]);

  return (
    <>
      <div className="p-4 flex gap-4 items-center">
        <Input placeholder="Cerca" onChange={e => setSearch(e.target.value)} />
        <Search className="w-6 h-6" />
      </div>
      <div className="h-full overflow-y-auto divide-y">
        {filteredChats.map(c => (
          <ChatPreview key={`${c.type}${c.id}`} chat={c} selected={params.type === c.type && params.id === c.id} />
        ))}
      </div>
    </>
  );
}

export default Chats;