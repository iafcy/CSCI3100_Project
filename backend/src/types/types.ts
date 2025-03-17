export type Thread = {
  id: number;
  username: string;
  title: string | null;
  categoryId: number;
}

export type Comment = {
  id: number;
  threadId: number;
  username: string;
  like: number;
  dislike: number;
  content: string;
}