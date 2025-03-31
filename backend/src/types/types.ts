export type Thread = {
  id: number;
  title: string;
  user_id: number;
  username: string;
  category_id: number;
  like: number;
  dislike: number;
  created_at: Date;
}

export type Comment = {
  id: number;
  user_id: number;
  username: string;
  thread_id: number;
  content: string;
  like: number;
  dislike: number;
  created_at: Date;
}