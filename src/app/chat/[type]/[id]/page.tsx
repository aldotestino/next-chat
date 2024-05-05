import Chat from '@/components/chat';
import ChatNavbar from '@/components/chat-navbar';
import MessageInput from '@/components/message-input';

function ChatPage({ params }: { params: { type: string, id: string } }) {

  const name = 'John Doe';
  const image = 'https://github.com/shadcn.png';

  return (
    <main className="grid grid-rows-[auto,1fr,auto]">
      <ChatNavbar name={name} image={image} />
      <Chat />
      <MessageInput chatType={params.type} chatId={params.id} />
    </main>
  );
}

export default ChatPage;