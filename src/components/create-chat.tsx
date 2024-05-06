'use client';

import { searchForUser } from '@/server/query';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Search, SquarePen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import Spinner from './ui/spinner';
import { createPersonalChat } from '@/server/actions';
import { getHandle } from '@/lib/utils';

function CreateChat() {

  const [searchTerm, setSearchTerm] = useState('');
  const [foundUsers, setFoundUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSearchForUser(st: string) {
    setIsLoading(true);
    searchForUser(st)
      .then(setFoundUsers)
      .finally(() => setIsLoading(false));
  }

  function handleCreateChat(userId: string) {
    createPersonalChat(userId);
  }

  useEffect(() => {
    if(!searchTerm.trim()) {
      setFoundUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearchForUser(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <SquarePen className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 items-center">
          <Input placeholder="Search for user" defaultValue={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='pl-8' />
          {isLoading ? <Spinner className='absolute left-8 text-muted-foreground' /> : <Search className="w-4 h-4 absolute left-8 text-muted-foreground" />}
        </div>
        <div className='h-md overflow-y-auto divide-y'>
          {foundUsers.map(user => (
            <div key={user.id} onClick={() => handleCreateChat(user.id)} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.image || undefined} alt={getHandle(user)} />
                <AvatarFallback>{getHandle(user)[0]}</AvatarFallback>
              </Avatar>
              <p>{getHandle(user)}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChat;