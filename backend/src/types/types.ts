export type Thread = {
  id: number;
  title: string;
  user_id: string;
  username: string;
  category_id: number;
  like: number;
  dislike: number;
  created_at: Date;
}

export type Comment = {
  id: number;
  user_id: string;
  username: string;
  thread_id: number;
  content: string;
  like: number;
  dislike: number;
  created_at: Date;
}