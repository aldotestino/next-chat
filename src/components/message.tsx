import { MessageT } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { cn, formatDate } from '@/lib/utils';

function Message({ message, nextCreatedAt, nextIsMine }: {message: MessageT, nextCreatedAt?: Date, nextIsMine?: boolean}) {

  const messageFormattedDate = formatDate(message.createdAt);
  const nextFormattedDate = nextCreatedAt ? formatDate(nextCreatedAt) : null;

  const showTime =
    nextFormattedDate === null ||
    messageFormattedDate !== nextFormattedDate ||
    (nextIsMine !== undefined && (message.isMine !== nextIsMine));

  return (
    <div className={cn('flex gap-1 flex-col w-fit max-w-md', message.isMine ? 'self-end items-end' : 'self-start items-start', showTime && 'pb-2 last:pb-0')}>
      <p className={cn('p-2 rounded-lg w-fit', message.isMine ? 'bg-primary' : 'bg-muted')}>
        {message.content}
      </p>
      {showTime && <small>{messageFormattedDate}</small>}
    </div>
  );
}

export default Message;

export function MessageFallback() {
  return (
    <div className='odd:self-end flex gap-1 flex-col odd:items-end'>
      <Skeleton className="w-60 h-16" />
      <Skeleton className="w-20 h-4" />
    </div>
  );
}