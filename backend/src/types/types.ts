export type Thread = {
  id: number;
  title: string;
  userId: number;
  username: string;
  categoryId: number;
  like: number;
  dislike: number;
  createdAt: Date;
}

export type Comment = {
  id: number;
  userId: number;
  username: string;
  threadId: number;
  content: string;
  like: number;
  dislike: number;
  createdAt: Date;
}