'use client';

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';

export default function CommentListPagination({
  page, totalPages, categoryId, threadId
} : {
  page: number;
  totalPages: number;
  categoryId: number;
  threadId: number;
}) {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/category/${categoryId}/thread/${threadId}?page=${value}`)
  };

  return (
    <Pagination
      color="primary"
      count={totalPages}
      page={page}
      onChange={handleChange}
    />
  );
}
