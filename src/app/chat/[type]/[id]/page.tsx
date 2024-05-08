import Chat, { ChatFallback } from '@/components/chat';
import { Suspense } from 'react';

async function ChatPage({ params }: { params: { type: string, id: string } }) {

  return (
    <Suspense fallback={<ChatFallback />}>
      <Chat chatType={params.type} chatId={params.id} />
    </Suspense>
  );
}

export default ChatPage;