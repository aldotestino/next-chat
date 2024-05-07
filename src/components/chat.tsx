import { MessageT } from '@/lib/types';
import Message, { MessageFallback } from './message';

function Chat({ messages }: {messages: MessageT[]}) {
  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto'>
      {messages.map((message, i) => (
        <Message key={message.id} message={message} nextCreatedAt={messages[i+1]?.createdAt} nextIsMine={messages[i+1]?.isMine} />
      ))}
    </div>
  );
}

export function ChatFallback() {
  return (
    <div className='flex flex-col gap-2 p-4 overflow-y-auto'>
      {Array.from({ length: 5 }).map((_, i) => (
        <MessageFallback key={i} />
      ))}
    </div>
  );
}

export default Chat;