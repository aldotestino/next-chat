import { ChatFallback } from '@/components/chat';
import { ChatNavbarFallback } from '@/components/chat-navbar';
import MessageInput from '@/components/message-input';

function ChatPageFallback() {
  return (
    <main className="grid grid-rows-[auto,1fr,auto]">
      <ChatNavbarFallback />
      <ChatFallback />
      <MessageInput chatType="p" chatId="1" />
    </main>
  );
}

export default ChatPageFallback;