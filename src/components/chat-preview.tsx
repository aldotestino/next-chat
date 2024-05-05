import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

function ChatPreview({ chat, selected }: {chat: {id: string, type: string, name: string, image?: string, lastMessage: string}, selected: boolean}) {
  
  return (
    <Link href={`/chat/${chat.type}/${chat.id}`} className={cn('block p-4 hover:bg-muted', selected && 'bg-primary hover:bg-primary')}>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={chat.image} alt={chat.name} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{chat.name}</p>
          <p className={cn('text-muted-foreground', selected && 'text-primary-foreground')}>{chat.lastMessage}</p>
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