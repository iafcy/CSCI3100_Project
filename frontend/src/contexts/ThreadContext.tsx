import React, { createContext, useState } from "react";
import { Thread, Comment } from "../types/types";

type ThreadContextType = {
  thread: Thread | null;
  comments: Comment[] | null;
  setThread: React.Dispatch<React.SetStateAction<Thread | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>
}

const ThreadContext = createContext<ThreadContextType>({
  thread: null,
  comments: null,
  setThread: () => {},
  setComments: () => {},
});

const ThreadProvider = ({
  children
} : {
  children: React.ReactNode;
}) => {
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  return (
    <ThreadContext.Provider value={{
      thread,
      comments,
      setThread,
      setComments
    }}>
      {children}
    </ThreadContext.Provider>
  );
};

export { ThreadProvider, ThreadContext };