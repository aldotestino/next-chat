import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import ChatNavbar, { ChatNavbarFallback } from './chat-navbar';
import Messages, { MessagesFallback } from './messages';
import MessageInput from './message-input';
import { getChat } from '@/server/actions';

async function Chat({ chatType, chatId }: {chatType: string, chatId: string}) {

  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: [`chat:${chatId}`],
    queryFn: async () => getChat({ chatId: parseInt(chatId) }),
  });

  return (
    <main className="grid grid-rows-[auto,1fr,auto] overflow-y-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatNavbar chatId={chatId} />
        <Messages chatId={chatId} />
      </HydrationBoundary>
      <MessageInput chatType={chatType} chatId={chatId} />
    </main>
  );
}

export default Chat;

export function ChatFallback() {
  return (
    <main className="grid grid-rows-[auto,1fr,auto] overflow-hidden">
      <ChatNavbarFallback />
      <MessagesFallback />
      <MessageInput chatType="p" chatId="1" />
    </main>
  );
}
