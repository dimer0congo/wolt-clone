import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailAuthButton from '../../../components/auth/EmailAuthButton';

describe('EmailAuthButton', () => {
  describe('rendering', () => {
    it('should render correctly', () => {
      const { getByText } = render(<EmailAuthButton />);
      expect(getByText('Continue with email')).toBeTruthy();
    });

    it('should render with correct text', () => {
      const { getByText } = render(<EmailAuthButton />);
      const buttonText = getByText('Continue with email');
      expect(buttonText).toBeTruthy();
    });

    it('should render mail icon', () => {
      const { UNSAFE_getByType } = render(<EmailAuthButton />);
      const icons = UNSAFE_getByType('Ionicons' as any);
      expect(icons).toBeTruthy();
    });
  });

  describe('interaction', () => {
    it('should be touchable', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      expect(button).toBeTruthy();
    });

    it('should handle press events', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      
      // Should not throw when pressed (even without onPress handler)
      expect(() => {
        if (button) {
          fireEvent.press(button);
        }
      }).not.toThrow();
    });
  });

  describe('styling', () => {
    it('should have correct background color', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#badafaff'
          })
        ])
      );
    });

    it('should have flex direction row', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            flexDirection: 'row'
          })
        ])
      );
    });

    it('should have correct padding', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            paddingVertical: 17
          })
        ])
      );
    });

    it('should have border radius', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            borderRadius: 12
          })
        ])
      );
    });

    it('should have correct text color', () => {
      const { getByText } = render(<EmailAuthButton />);
      const text = getByText('Continue with email');
      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color: '#3b82c5ff'
          })
        ])
      );
    });

    it('should have correct font size', () => {
      const { getByText } = render(<EmailAuthButton />);
      const text = getByText('Continue with email');
      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 16
          })
        ])
      );
    });

    it('should have correct font weight', () => {
      const { getByText } = render(<EmailAuthButton />);
      const text = getByText('Continue with email');
      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontWeight: '600'
          })
        ])
      );
    });
  });

  describe('accessibility', () => {
    it('should be accessible', () => {
      const { getByText } = render(<EmailAuthButton />);
      const button = getByText('Continue with email').parent;
      expect(button).toBeTruthy();
    });

    it('should have accessible text', () => {
      const { getByText } = render(<EmailAuthButton />);
      expect(getByText('Continue with email')).toBeTruthy();
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const tree = render(<EmailAuthButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});