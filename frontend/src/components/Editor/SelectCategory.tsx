import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from '../../utils/axios';
import { useParams } from "react-router-dom";
import { useTheme } from '@mui/material';

export default function SelectCategory({
  selectedCategory, setSelectedCategory
} : {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
}) {
  const theme = useTheme();
  const [categories, setCategories] = React.useState<{id: number, name: string}[]>([]);
  const { categoryId } = useParams();

  React.useEffect(() => {
    axios.get(`http://localhost:8080/category/list`)
      .then((response) => {
        setCategories(response.data.data.category);
        if (categoryId) {
          setSelectedCategory(categoryId);
        }
      })
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
          <MenuItem value={c.id}>{c.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
