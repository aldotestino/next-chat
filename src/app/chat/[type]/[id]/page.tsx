import Chat from '@/components/chat';
import ChatNavbar from '@/components/chat-navbar';
import MessageInput from '@/components/message-input';
import { getChat } from '@/server/actions';

async function ChatPage({ params }: { params: { type: string, id: string } }) {

  const result = await getChat({ chatId: parseInt(params.id) });

  return (
    <main className="grid grid-rows-[auto,1fr,auto]">
      <ChatNavbar user={result.data!.user} />
      <Chat />
      <MessageInput chatType={params.type} chatId={params.id} />
    </main>
  );
}

export default ChatPage;