export type User = {
  id: string;
  username: string | null;
  email: string;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
}

export type ChatPreviewT = {
  id: number;
  user: User;
  lastMessage: Pick<MessageT, 'content' | 'createdAt'> | null;
}

export type MessageT = {
  id: number;
  isMine: boolean;
  content: string;
  createdAt: Date;
}

export type ChatT = {
  id: number;
  user: User;
  messages: MessageT[];
}