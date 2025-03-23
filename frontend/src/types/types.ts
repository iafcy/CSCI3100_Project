export type Thread = {
  id: number;
  title: string;
  userId: number;
  username: string;
  categorId: number;
  like: number;
  dislike: number;
  view: number;
  createdAt: Date
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

export type Category = {
  id: number;
  name: string;
}

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}