import { createContext, useState } from 'react';
import { Category } from '../types/types';

type UserProfileInfo = {
  userId: number | string;
  username: string;
}

type NavContextType = {
  activeCategory: Category | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  activeUserProfile: UserProfileInfo | null;
  setActiveUserProfile: React.Dispatch<React.SetStateAction<UserProfileInfo | null>>;
}

const NavContext = createContext<NavContextType>({
  activeCategory: null,
  setActiveCategory: () => {},
  activeUserProfile: null,
  setActiveUserProfile: () => {},
});

function NavProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeUserProfile, setActiveUserProfile] = useState<UserProfileInfo | null>(null);

  return (
    <NavContext.Provider
      value={{ activeCategory, setActiveCategory, activeUserProfile, setActiveUserProfile }}
    >
      {children}
    </NavContext.Provider>
  );
}

export { NavProvider, NavContext };