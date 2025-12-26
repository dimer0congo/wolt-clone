import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../../hooks/use-userstore';

describe('useUserStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the store state
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.setIsGuest(false);
      result.current.setUser(null);
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.isGuest).toBe(false);
      expect(result.current.user).toBeNull();
    });

    it('should provide setter functions', () => {
      const { result } = renderHook(() => useUserStore());

      expect(typeof result.current.setIsGuest).toBe('function');
      expect(typeof result.current.setUser).toBe('function');
    });
  });

  describe('setIsGuest', () => {
    it('should update isGuest to true', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setIsGuest(true);
      });

      expect(result.current.isGuest).toBe(true);
    });

    it('should update isGuest to false', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setIsGuest(true);
      });
      expect(result.current.isGuest).toBe(true);

      act(() => {
        result.current.setIsGuest(false);
      });

      expect(result.current.isGuest).toBe(false);
    });

    it('should persist isGuest state', async () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setIsGuest(true);
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });

    it('should handle multiple rapid updates', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setIsGuest(true);
        result.current.setIsGuest(false);
        result.current.setIsGuest(true);
      });

      expect(result.current.isGuest).toBe(true);
    });
  });

  describe('setUser', () => {
    it('should update user with valid user object', () => {
      const { result } = renderHook(() => useUserStore());
      const mockUser = { id: '123', name: 'Test User', email: 'test@example.com' };

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
    });

    it('should update user to null', () => {
      const { result } = renderHook(() => useUserStore());
      const mockUser = { id: '123', name: 'Test User' };

      act(() => {
        result.current.setUser(mockUser);
      });
      expect(result.current.user).toEqual(mockUser);

      act(() => {
        result.current.setUser(null);
      });

      expect(result.current.user).toBeNull();
    });

    it('should handle complex user objects', () => {
      const { result } = renderHook(() => useUserStore());
      const complexUser = {
        id: '123',
        profile: {
          name: 'Test User',
          address: {
            street: '123 Main St',
            city: 'Test City'
          }
        },
        preferences: ['pizza', 'burger']
      };

      act(() => {
        result.current.setUser(complexUser);
      });

      expect(result.current.user).toEqual(complexUser);
    });

    it('should persist user state', async () => {
      const { result } = renderHook(() => useUserStore());
      const mockUser = { id: '123', name: 'Test User' };

      act(() => {
        result.current.setUser(mockUser);
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });

    it('should replace previous user data', () => {
      const { result } = renderHook(() => useUserStore());
      const firstUser = { id: '123', name: 'First User' };
      const secondUser = { id: '456', name: 'Second User' };

      act(() => {
        result.current.setUser(firstUser);
      });
      expect(result.current.user).toEqual(firstUser);

      act(() => {
        result.current.setUser(secondUser);
      });
      expect(result.current.user).toEqual(secondUser);
    });
  });

  describe('combined state updates', () => {
    it('should handle both isGuest and user updates together', () => {
      const { result } = renderHook(() => useUserStore());
      const mockUser = { id: '123', name: 'Test User' };

      act(() => {
        result.current.setIsGuest(true);
        result.current.setUser(mockUser);
      });

      expect(result.current.isGuest).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });

    it('should clear user when logging out', () => {
      const { result } = renderHook(() => useUserStore());
      const mockUser = { id: '123', name: 'Test User' };

      act(() => {
        result.current.setUser(mockUser);
        result.current.setIsGuest(false);
      });
      expect(result.current.user).toEqual(mockUser);

      act(() => {
        result.current.setUser(null);
        result.current.setIsGuest(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isGuest).toBe(false);
    });
  });

  describe('persistence', () => {
    it('should use correct storage key', async () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setIsGuest(true);
      });

      await waitFor(() => {
        const calls = (AsyncStorage.setItem as jest.Mock).mock.calls;
        const userStorageCalls = calls.filter(call => call[0] === 'user');
        expect(userStorageCalls.length).toBeGreaterThan(0);
      });
    });
  });

  describe('type safety', () => {
    it('should accept any type for user field', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUser('string user');
      });
      expect(result.current.user).toBe('string user');

      act(() => {
        result.current.setUser(12345);
      });
      expect(result.current.user).toBe(12345);

      act(() => {
        result.current.setUser({ complex: 'object' });
      });
      expect(result.current.user).toEqual({ complex: 'object' });
    });

    it('should only accept boolean for isGuest', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setIsGuest(true);
      });
      expect(result.current.isGuest).toBe(true);

      act(() => {
        result.current.setIsGuest(false);
      });
      expect(result.current.isGuest).toBe(false);
    });
  });
});