import { useContext } from 'react';
import { ThreadContext } from '../contexts/ThreadContext';

const useThread = () => {
  const context = useContext(ThreadContext);

  if (!context) throw new Error('ThreadContext must be used inside ThreadPovider');

  return context;
}

export default useThread;
