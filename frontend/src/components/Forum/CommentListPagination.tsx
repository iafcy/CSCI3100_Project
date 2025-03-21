import Pagination from '@mui/material/Pagination';
import { useSearchParams  } from "react-router-dom";

export default function CommentListPagination({
  page, totalPages
} : {
  page: number;
  totalPages: number;
}) {
  const [_, setSearchParams] = useSearchParams();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: `${value}` })
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
