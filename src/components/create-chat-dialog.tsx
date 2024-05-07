'use client';

import { SquarePen } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import CreateChat from './create-chat';
import { DialogDescription } from '@radix-ui/react-dialog';

function CreateChatDialog() {

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
          <DialogDescription>Search for user to start a new chat</DialogDescription>
        </DialogHeader>
        <CreateChat />
      </DialogContent>
    </Dialog>
  );
}

export default CreateChatDialog;
