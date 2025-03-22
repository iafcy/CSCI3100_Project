import { createContext, useEffect, useState } from 'react';
import axios from '../utils/axios';

const CategoriesContext = createContext<{id: number, name: string}[]>([]);

function CategoriesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/category/list`)
      .then((response) => {
        setCategories(response.data.data.category);
      })
  }, []);

  return (
    <CategoriesContext.Provider
      value={categories}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesProvider, CategoriesContext };