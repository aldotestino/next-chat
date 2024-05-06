import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn, getHandle } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { ChatPreviewT } from '@/lib/types';

function ChatPreview({ chat, selected }: {chat: ChatPreviewT, selected: boolean}) {
  
  return (
    <Link href={`/chat/p/${chat.id}`} className={cn('block p-4 hover:bg-muted', selected && 'bg-primary hover:bg-primary')}>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={chat.user.image || undefined} alt={getHandle(chat.user)} />
          <AvatarFallback>{getHandle(chat.user)[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold text-ellipsis">{getHandle(chat.user)}</p>
          {chat.lastMessage && <p className={cn('text-muted-foreground truncate', selected && 'text-primary-foreground')}>{chat.lastMessage.content}</p>}
        </div>
      </div>
    </Link>
  );
}

export function ChatPreviewFallback() {
  return (
    <div className='p-4 flex items-center gap-4 w-full'>
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  );
}

export default ChatPreview;