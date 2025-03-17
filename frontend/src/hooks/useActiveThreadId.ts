'use client';

import { usePathname } from 'next/navigation';

export function useActiveThreadId(): string | null {
  const pathname = usePathname();
  let activeThreadId: string | null = null;
  const match = pathname.match(/\/thread\/([^\/]+)/);
  if (match) {
    activeThreadId = match[1];
  }
  return activeThreadId;
}
