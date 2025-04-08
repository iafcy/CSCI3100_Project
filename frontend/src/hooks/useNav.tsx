import { useContext } from 'react';
import { NavContext } from '../contexts/NavContext';

const useNav = () => {
  const context = useContext(NavContext);

  if (!context) throw new Error('NavContext must be used inside NavPovider');

  return context;
}

export default useNav;
