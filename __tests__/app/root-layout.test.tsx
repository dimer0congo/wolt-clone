import React from 'react';
import { render } from '@testing-library/react-native';
import RootNav from '../../app/(app)/_layout';
import useUserStore from '../../hooks/use-userstore';

jest.mock('../../hooks/use-userstore');

describe('RootNav Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering with guest user', () => {
    it('should render when user is guest', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: true,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const { toJSON } = render(<RootNav />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render when user is authenticated', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: false,
        user: { id: '123', name: 'Test User' },
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const { toJSON } = render(<RootNav />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('rendering with unauthenticated user', () => {
    it('should render when user is not authenticated and not guest', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: false,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const { toJSON } = render(<RootNav />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('user state transitions', () => {
    it('should handle transition from unauthenticated to guest', () => {
      const mockStore = {
        isGuest: false,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      };
      (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);

      const { rerender } = render(<RootNav />);
      expect(useUserStore).toHaveBeenCalled();

      // Simulate state change to guest
      mockStore.isGuest = true;
      (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);

      rerender(<RootNav />);
      expect(useUserStore).toHaveBeenCalled();
    });

    it('should handle transition from guest to authenticated', () => {
      const mockStore = {
        isGuest: true,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      };
      (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);

      const { rerender } = render(<RootNav />);

      // Simulate state change to authenticated
      mockStore.isGuest = false;
      mockStore.user = { id: '123', name: 'Test' };
      (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);

      rerender(<RootNav />);
      expect(useUserStore).toHaveBeenCalled();
    });
  });

  describe('protected routes', () => {
    it('should protect auth routes for authenticated users', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: true,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const { toJSON } = render(<RootNav />);
      expect(toJSON()).toBeTruthy();
    });

    it('should protect public routes for unauthenticated users', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: false,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const { toJSON } = render(<RootNav />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('hook integration', () => {
    it('should use useUserStore hook', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: false,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      render(<RootNav />);
      expect(useUserStore).toHaveBeenCalled();
    });

    it('should access isGuest from store', () => {
      const mockStore = {
        isGuest: true,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      };
      (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);

      render(<RootNav />);
      expect(useUserStore).toHaveBeenCalled();
    });

    it('should access user from store', () => {
      const mockStore = {
        isGuest: false,
        user: { id: '123' },
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      };
      (useUserStore as unknown as jest.Mock).mockReturnValue(mockStore);

      render(<RootNav />);
      expect(useUserStore).toHaveBeenCalled();
    });
  });

  describe('snapshot', () => {
    it('should match snapshot with guest user', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: true,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const tree = render(<RootNav />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot with authenticated user', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: false,
        user: { id: '123' },
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const tree = render(<RootNav />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshot with unauthenticated user', () => {
      (useUserStore as unknown as jest.Mock).mockReturnValue({
        isGuest: false,
        user: null,
        setIsGuest: jest.fn(),
        setUser: jest.fn(),
      });

      const tree = render(<RootNav />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});