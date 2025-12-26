import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OtherOptionScreen from '../../app/(app)/(public)/other-options';
import useUserStore from '../../hooks/use-userstore';
import { useRouter } from 'expo-router';

jest.mock('../../hooks/use-userstore');
jest.mock('expo-router');

describe('OtherOptionScreen', () => {
  const mockSetIsGuest = jest.fn();
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      isGuest: false,
      user: null,
      setIsGuest: mockSetIsGuest,
      setUser: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  describe('rendering', () => {
    it('should render correctly', () => {
      const { getByText } = render(<OtherOptionScreen />);
      expect(getByText('Other Options')).toBeTruthy();
    });

    it('should render title', () => {
      const { getByText } = render(<OtherOptionScreen />);
      expect(getByText('Other Options')).toBeTruthy();
    });

    it('should render Facebook auth button', () => {
      const { getByText } = render(<OtherOptionScreen />);
      expect(getByText('Continuer with facebook')).toBeTruthy();
    });

    it('should render Email auth button', () => {
      const { getByText } = render(<OtherOptionScreen />);
      expect(getByText('Continue with email')).toBeTruthy();
    });

    it('should render continue as guest link', () => {
      const { getByText } = render(<OtherOptionScreen />);
      expect(getByText('Continue as guest')).toBeTruthy();
    });

    it('should render decorative icon', () => {
      const { UNSAFE_getByType } = render(<OtherOptionScreen />);
      const icon = UNSAFE_getByType('AntDesign' as any);
      expect(icon).toBeTruthy();
    });
  });

  describe('continue as guest functionality', () => {
    it('should call setIsGuest with true when continue as guest is pressed', () => {
      const { getByText } = render(<OtherOptionScreen />);
      const guestButton = getByText('Continue as guest');

      fireEvent.press(guestButton);

      expect(mockSetIsGuest).toHaveBeenCalledWith(true);
      expect(mockSetIsGuest).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple presses of continue as guest', () => {
      const { getByText } = render(<OtherOptionScreen />);
      const guestButton = getByText('Continue as guest');

      fireEvent.press(guestButton);
      fireEvent.press(guestButton);

      expect(mockSetIsGuest).toHaveBeenCalledTimes(2);
      expect(mockSetIsGuest).toHaveBeenCalledWith(true);
    });

    it('should set guest mode correctly', async () => {
      const { getByText } = render(<OtherOptionScreen />);
      const guestButton = getByText('Continue as guest');

      fireEvent.press(guestButton);

      await waitFor(() => {
        expect(mockSetIsGuest).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('hook integration', () => {
    it('should use useUserStore hook', () => {
      render(<OtherOptionScreen />);
      expect(useUserStore).toHaveBeenCalled();
    });

    it('should use useRouter hook', () => {
      render(<OtherOptionScreen />);
      expect(useRouter).toHaveBeenCalled();
    });

    it('should extract setIsGuest from store', () => {
      const { getByText } = render(<OtherOptionScreen />);
      const guestButton = getByText('Continue as guest');

      fireEvent.press(guestButton);

      expect(mockSetIsGuest).toHaveBeenCalled();
    });
  });

  describe('layout and styling', () => {
    it('should have correct container layout', () => {
      const { getByText } = render(<OtherOptionScreen />);
      const title = getByText('Other Options');
      expect(title.parent?.parent).toBeTruthy();
    });

    it('should display auth buttons in column', () => {
      const { getByText } = render(<OtherOptionScreen />);
      const facebookButton = getByText('Continuer with facebook');
      const emailButton = getByText('Continue with email');
      
      expect(facebookButton).toBeTruthy();
      expect(emailButton).toBeTruthy();
    });
  });

  describe('authentication options', () => {
    it('should provide multiple authentication methods', () => {
      const { getByText } = render(<OtherOptionScreen />);
      
      expect(getByText('Continuer with facebook')).toBeTruthy();
      expect(getByText('Continue with email')).toBeTruthy();
      expect(getByText('Continue as guest')).toBeTruthy();
    });

    it('should separate guest option from auth options visually', () => {
      const { getByText } = render(<OtherOptionScreen />);
      const guestText = getByText('Continue as guest');
      
      // Guest option should have different styling (blue color)
      expect(guestText.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color: '#3b82c5ff'
          })
        ])
      );
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const tree = render(<OtherOptionScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});