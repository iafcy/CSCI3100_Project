import React, { createContext, useState } from "react";
import { Thread, Comment } from "../types/types";
import axios from "../utils/axios";

type ThreadContextType = {
  activeThread: Thread | null;
  threads: Thread[];
  comments: Comment[] | null;
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>;
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  toggleLike: (threadId: number) => void;
  toggleDislike: (threadId: number) => void;
}

const ThreadContext = createContext<ThreadContextType>({
  activeThread: null,
  threads: [],
  comments: null,
  setActiveThread: () => {},
  setThreads: () => {},
  setComments: () => {},
  toggleLike: () => {},
  toggleDislike: () => {},
});

const ThreadProvider = ({
  children
} : {
  children: React.ReactNode;
}) => {
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const toggleLike = (threadId: number) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        const updatedThread = { ...thread };
        const wasDislike = updatedThread.user_reaction === 'dislike';
  
        if (updatedThread.user_reaction === 'like') {
          updatedThread.like -= 1;
          updatedThread.user_reaction = null;
        } else {
          updatedThread.like += 1;
          if (wasDislike) updatedThread.dislike -= 1;
          updatedThread.user_reaction = 'like';
        }
  
        if (activeThread?.id === threadId) {
          setActiveThread(updatedThread);
        }
  
        const apiCall = updatedThread.user_reaction === 'like' 
          ? axios.post(`/thread/${threadId}/like`)
          : axios.delete(`/thread/${threadId}/reaction`);
  
        apiCall.catch(error => {
          setThreads(prevThreads => prevThreads.map(t => {
            if (t.id === threadId) {
              return {
                ...t,
                like: thread.like,
                dislike: wasDislike ? thread.dislike : t.dislike,
                user_reaction: thread.user_reaction
              };
            }
            return t;
          }));
        });
  
        return updatedThread;
      }
      return thread;
    }));
  };
  
  const toggleDislike = (threadId: number) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        const updatedThread = { ...thread };
        const wasLike = updatedThread.user_reaction === 'like';
  
        if (updatedThread.user_reaction === 'dislike') {
          updatedThread.dislike -= 1;
          updatedThread.user_reaction = null;
        } else {
          updatedThread.dislike += 1;
          if (wasLike) updatedThread.like -= 1;
          updatedThread.user_reaction = 'dislike';
        }
  
        if (activeThread?.id === threadId) {
          setActiveThread(updatedThread);
        }
  
        const apiCall = updatedThread.user_reaction === 'dislike'
          ? axios.post(`/thread/${threadId}/dislike`)
          : axios.delete(`/thread/${threadId}/reaction`);
  
        apiCall.catch(error => {
          setThreads(prevThreads => prevThreads.map(t => {
            if (t.id === threadId) {
              return {
                ...t,
                dislike: thread.dislike,
                like: wasLike ? thread.like : t.like,
                user_reaction: thread.user_reaction
              };
            }
            return t;
          }));
        });
  
        return updatedThread;
      }
      return thread;
    }));
  };

  return (
    <ThreadContext.Provider value={{
      activeThread,
      threads,
      comments,
      setActiveThread,
      setThreads,
      setComments,
      toggleLike,
      toggleDislike
    }}>
      {children}
    </ThreadContext.Provider>
  );
};

export { ThreadProvider, ThreadContext };