import zustandStorage from '@/utils/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  isGuest: boolean;
  user: any;
  setIsGuest: (isGuest: boolean) => void;
  setUser: (user: any) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isGuest: false,
      user: null,
      setIsGuest: (isGuest) => set({ isGuest }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useUserStore;
