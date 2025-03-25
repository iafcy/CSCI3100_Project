import { createContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Category } from '../types/types';

type CategoriesContextType = {
  categories: Category[];
  activeCategory: Category | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  activeCategory: null,
  setActiveCategory: () => {},
});

function CategoriesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/category/list`)
      .then((response) => {
        setCategories(response.data.data.category);
      })
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, activeCategory, setActiveCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesProvider, CategoriesContext };