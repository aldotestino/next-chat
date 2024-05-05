import { Inbox } from 'lucide-react';
import React from 'react';

function EmptyChatPage() {
  return (
    <main className="w-full flex flex-col justify-center items-center text-muted-foreground text-center">
      <Inbox className="w-12 h-12" />
      <p className="text-lg font-semibold">Open a chat</p>
    </main>
  );
}

export default EmptyChatPage;