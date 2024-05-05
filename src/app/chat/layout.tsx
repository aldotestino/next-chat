import ChatSidebar, { ChatSidebarFallback } from '@/components/chat-sidebar';
import React, { Suspense } from 'react';

function ChatLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full h-full grid grid-cols-[auto,1fr]">
      <Suspense fallback={<ChatSidebarFallback />}>
        <ChatSidebar />
      </Suspense>
      {children}
    </div>
  );
}

export default ChatLayout;