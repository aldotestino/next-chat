import { useAction } from 'next-safe-action/hooks';
import { createPersonalChat, searchForUser } from '@/server/actions';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import Spinner from './ui/spinner';
import { getUserHandle } from '@/lib/utils';
import { Search } from 'lucide-react';
import UserAvatar from './user-avatar';

function CreateChat() {

  const [searchTerm, setSearchTerm] = useState('');

  const { 
    execute: executeSearchForUser, 
    result: resultSearchForUser,
    status: statusSearchForUser 
  } = useAction(searchForUser);

  const { execute: executeCreatePersonalChat } = useAction(createPersonalChat);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      executeSearchForUser({ searchTerm });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, executeSearchForUser]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Input placeholder="Search for user" defaultValue={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='pl-8' />
        {statusSearchForUser === 'executing' ? <Spinner className='absolute left-8 text-muted-foreground' /> : <Search className="w-4 h-4 absolute left-8 text-muted-foreground" />}
      </div>
      <div className='h-md overflow-y-auto divide-y'>
        {resultSearchForUser.data && resultSearchForUser.data.map(user => (
          <div key={user.id} onClick={() => executeCreatePersonalChat({ userId: user.id })} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted">
            <UserAvatar imageUrl={user.image} userHandle={getUserHandle(user)} />
            <p>{getUserHandle(user)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateChat;