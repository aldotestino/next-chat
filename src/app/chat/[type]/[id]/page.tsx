import Chat from '@/components/chat';
import ChatNavbar from '@/components/chat-navbar';
import MessageInput from '@/components/message-input';

function ChatPage({ params }: { params: { type: string, id: number } }) {
  return (
    <main className="grid grid-rows-[auto,1fr,auto]">
      <ChatNavbar />
      <Chat />
      <MessageInput />
    </main>
  );
}

export default ChatPage;