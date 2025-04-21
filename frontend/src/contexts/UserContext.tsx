import { createContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import useAuth from '../hooks/useAuth';

type UserProfileInfo = {
  id: number;
  username: string;
}

type UserContextType = {
  followingUsers: UserProfileInfo[];
  blockingUsers: UserProfileInfo[];
  isFollowing: (targetUserId: number) => boolean;
  followUser: (targetUserId: number) => { data: any, error: any};
  unfollowUser: (targetUserId: number) => { data: any, error: any};
  isBlocking: (targetUserId: number) => boolean;
  blockUser: (targetUserId: number) => { data: any, error: any};
  unblockUser: (targetUserId: number) => { data: any, error: any};
}

const UserContext = createContext<UserContextType>({
  followingUsers: [],
  blockingUsers: [],
  isFollowing: () => false,
  followUser: () => ({ data: null, error: null }),
  unfollowUser: () => ({ data: null, error: null }),
  isBlocking: () => false,
  blockUser: () => ({ data: null, error: null }),
  unblockUser: () => ({ data: null, error: null }),
});

function UserProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [followingUsers, setFollowingUsers] = useState<UserProfileInfo[]>([]);
  const [blockingUsers, setBlockingUsers] = useState<UserProfileInfo[]>([]);
  const { user, authenticated } = useAuth();

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/user/following`)
        .then((response) => {
          setFollowingUsers(response.data.data);
        })
      axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/user/blocking`)
        .then((response) => {
          setBlockingUsers(response.data.data);
        })
    } else {
      setFollowingUsers([]);
      setBlockingUsers([]);
    }
  }, [authenticated]);

  const isFollowing = (targetUserId: number) => {
    return followingUsers.some(user => user.id == targetUserId);
  }

  const followUser = (targetUserId: number) => {
    if (user && !isFollowing(targetUserId)) {
      axios.post('/user/follow', { targetUserId })
        .then(response => {
          setFollowingUsers([response.data.data, ...followingUsers]);
          return { data: response.data, error: null };
        })
        .catch(error => {
          return { data: null, error };
        });
    }

    return { data: null, error: null };
  }

  const unfollowUser = (targetUserId: number) => {
    if (user && isFollowing(targetUserId)) {
      axios.post('/user/unfollow', { targetUserId })
        .then(response => {
          setFollowingUsers(followingUsers.filter(user => user.id !== targetUserId));
          return { data: response.data, error: null };
        })
        .catch(error => {
          return { data: null, error };
        });
    }

    return { data: null, error: null };
  }

  const isBlocking = (targetUserId: number) => {
    return blockingUsers.some(user => user.id == targetUserId);
  }

  const blockUser = (targetUserId: number) => {
    if (user && !isBlocking(targetUserId)) {
      axios.post('/user/block', { targetUserId })
        .then(response => {
          setBlockingUsers([response.data.data, ...blockingUsers]);
          return { data: response.data, error: null };
        })
        .catch(error => {
          return { data: null, error };
        });
    }

    return { data: null, error: null };
  }

  const unblockUser = (targetUserId: number) => {
    if (user && isBlocking(targetUserId)) {
      axios.post('/user/unblock', { targetUserId })
        .then(response => {
          setBlockingUsers(blockingUsers.filter(user => user.id !== targetUserId));
          return { data: response.data, error: null };
        })
        .catch(error => {
          return { data: null, error };
        });
    }
    
    return { data: null, error: null };
  }

  return (
    <UserContext.Provider
      value={{
        followingUsers,
        blockingUsers,
        isFollowing,
        followUser,
        unfollowUser,
        isBlocking,
        blockUser,
        unblockUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };