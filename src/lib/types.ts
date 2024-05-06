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
  lastMessage: {
    content: string;
    createdAt: Date;
  } | null;
}