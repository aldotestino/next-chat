'use client';
import { Separator } from './ui/separator';
import UserAvatar from './user-avatar';
import { getUserHandle } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { getChat } from '@/server/actions';
import { useQuery } from '@tanstack/react-query';

function ChatNavbar({ chatId }: { chatId: string }) {

  const { data } = useQuery({
    queryKey: [`chat:${chatId}`],
    queryFn: async () => getChat({ chatId: parseInt(chatId) }),
  });

  return (
    <div>
      <div className="p-4 flex items-center gap-4">
        <UserAvatar imageUrl={data?.data?.user.image || undefined} userHandle={getUserHandle(data?.data?.user)} />
        <p className="text-lg font-semibold">{getUserHandle(data?.data?.user)}</p>
      </div>
      <Separator />
    </div>
  );
}

export default ChatNavbar;

export function ChatNavbarFallback() {
  return (
    <div>
      <div className="p-4 flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-40 h-4" />
      </div>
      <Separator />
    </div>
  );
}