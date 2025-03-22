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
    axios.get(`http://localhost:8080/category/list`)
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