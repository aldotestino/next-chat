import ChatSidebar from '@/components/chat-sidebar';
import React from 'react';

function ChatLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full h-full grid grid-cols-[auto,1fr]">
      <ChatSidebar />
      {children}
    </div>
  );
}

export default ChatLayout;