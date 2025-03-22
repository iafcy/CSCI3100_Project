import { useContext } from 'react';
import { CategoriesContext } from '../contexts/CategoriesContext';

const useCategoies = () => {
  const context = useContext(CategoriesContext);

  if (!context) throw new Error('CategoriesContext must be used inside CategoriesPovider');

  return context;
}

export default useCategoies;
