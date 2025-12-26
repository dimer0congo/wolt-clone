import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../../app/(app)/(auth)/index';
import useUserStore from '../../hooks/use-userstore';

// Mock the useUserStore hook
jest.mock('../../hooks/use-userstore');

describe('AuthScreen', () => {
  const mockSetIsGuest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      isGuest: false,
      user: null,
      setIsGuest: mockSetIsGuest,
      setUser: jest.fn(),
    });
  });

  describe('rendering', () => {
    it('should render correctly', () => {
      const { getByText } = render(<AuthScreen />);
      expect(getByText('AuthScreen')).toBeTruthy();
    });

    it('should render the title', () => {
      const { getByText } = render(<AuthScreen />);
      expect(getByText('AuthScreen')).toBeTruthy();
    });

    it('should render the login button', () => {
      const { getByText } = render(<AuthScreen />);
      expect(getByText('Go Login')).toBeTruthy();
    });
  });

  describe('interaction', () => {
    it('should call setIsGuest with false when button is pressed', () => {
      const { getByText } = render(<AuthScreen />);
      const button = getByText('Go Login');

      fireEvent.press(button);

      expect(mockSetIsGuest).toHaveBeenCalledWith(false);
      expect(mockSetIsGuest).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple button presses', () => {
      const { getByText } = render(<AuthScreen />);
      const button = getByText('Go Login');

      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockSetIsGuest).toHaveBeenCalledTimes(3);
      expect(mockSetIsGuest).toHaveBeenCalledWith(false);
    });
  });

  describe('hook integration', () => {
    it('should use useUserStore hook', () => {
      render(<AuthScreen />);
      expect(useUserStore).toHaveBeenCalled();
    });

    it('should access setIsGuest from store', () => {
      const { getByText } = render(<AuthScreen />);
      const button = getByText('Go Login');

      fireEvent.press(button);

      expect(mockSetIsGuest).toHaveBeenCalled();
    });
  });

  describe('state transitions', () => {
    it('should transition from guest to login flow', async () => {
      const { getByText } = render(<AuthScreen />);
      const button = getByText('Go Login');

      fireEvent.press(button);

      await waitFor(() => {
        expect(mockSetIsGuest).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const tree = render(<AuthScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});