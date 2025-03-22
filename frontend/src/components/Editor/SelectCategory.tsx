import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from "react-router-dom";
import { useTheme } from '@mui/material';
import useCategoies from '../../hooks/useCategories';

export default function SelectCategory({
  selectedCategory, setSelectedCategory
} : {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
}) {
  const theme = useTheme();
  const categories = useCategoies();
  const { categoryId } = useParams();

  React.useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl
      sx={{
        flexShrink: 0
      }}
    >
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="category"
        onChange={handleChange}
        size="small"
        sx={{
          bgcolor: theme.palette.background.default
        }}
      >
        {categories.map(c => (
          <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
