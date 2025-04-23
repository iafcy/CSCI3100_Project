import { createContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Category } from '../types/types';
import { useNavigate } from 'react-router-dom';

type CategoriesContextType = {
  categories: Category[];
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
});

function CategoriesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/category/list`)
      .then((response) => {
        setCategories(response.data.data.category);
      })
      .catch((error) => {
        console.log(error);
        navigate('/error');
      })
  }, [navigate]);

  return (
    <CategoriesContext.Provider
      value={{ categories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesProvider, CategoriesContext };