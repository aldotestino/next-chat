import Link from 'next/link';
import { cn, formatPreviewDate, getUserHandle } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { ChatPreviewT } from '@/lib/types';
import UserAvatar from './user-avatar';

function ChatPreview({ chat, selected }: {chat: ChatPreviewT, selected: boolean}) {
  
  return (
    <Link href={`/chat/p/${chat.id}`} className={cn('block p-4 hover:bg-muted', selected && 'bg-primary hover:bg-primary')}>
      <div className="flex items-center gap-4">
        <UserAvatar imageUrl={chat.user.image || undefined} userHandle={getUserHandle(chat.user)} />
        <div className="min-w-0 w-full">
          <p className="text-lg font-semibold truncate">{getUserHandle(chat.user)}</p>
          {chat.lastMessage && <p className={cn('text-muted-foreground truncate', selected && 'text-primary-foreground')}>{chat.lastMessage.content}</p>}
        </div>
        {chat.lastMessage && <small className={cn('self-start place-self-end text-muted-foreground whitespace-nowrap', selected && 'text-primary-foreground')}>{formatPreviewDate(chat.lastMessage.createdAt)}</small>}
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