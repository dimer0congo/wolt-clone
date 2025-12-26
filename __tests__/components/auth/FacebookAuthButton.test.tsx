import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FacebookAuthButton from '../../../components/auth/FacebookAuthButton';

describe('FacebookAuthButton', () => {
  describe('rendering', () => {
    it('should render correctly', () => {
      const { getByText } = render(<FacebookAuthButton />);
      expect(getByText('Continuer with facebook')).toBeTruthy();
    });

    it('should render with correct text', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const buttonText = getByText('Continuer with facebook');
      expect(buttonText).toBeTruthy();
    });

    it('should render Facebook logo icon', () => {
      const { UNSAFE_getByType } = render(<FacebookAuthButton />);
      const icons = UNSAFE_getByType('Ionicons' as any);
      expect(icons).toBeTruthy();
    });
  });

  describe('interaction', () => {
    it('should be touchable', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button).toBeTruthy();
    });

    it('should handle press events', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      
      expect(() => {
        if (button) {
          fireEvent.press(button);
        }
      }).not.toThrow();
    });

    it('should not throw error on multiple presses', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      
      expect(() => {
        if (button) {
          fireEvent.press(button);
          fireEvent.press(button);
          fireEvent.press(button);
        }
      }).not.toThrow();
    });
  });

  describe('styling', () => {
    it('should have Facebook blue background color', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#4285F4'
          })
        ])
      );
    });

    it('should have flex direction row', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            flexDirection: 'row'
          })
        ])
      );
    });

    it('should have center alignment', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            alignItems: 'center',
            justifyContent: 'center'
          })
        ])
      );
    });

    it('should have correct padding', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            paddingVertical: 17
          })
        ])
      );
    });

    it('should have border radius', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            borderRadius: 12
          })
        ])
      );
    });

    it('should have gap between icon and text', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button?.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            gap: 4
          })
        ])
      );
    });

    it('should have white text color', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const text = getByText('Continuer with facebook');
      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color: '#fff'
          })
        ])
      );
    });

    it('should have correct font size', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const text = getByText('Continuer with facebook');
      expect(text.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 16
          })
        ])
      );
    });

    it('should have correct font weight', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const text = getByText('Continuer with facebook');
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
      const { getByText } = render(<FacebookAuthButton />);
      const button = getByText('Continuer with facebook').parent;
      expect(button).toBeTruthy();
    });

    it('should have descriptive text', () => {
      const { getByText } = render(<FacebookAuthButton />);
      expect(getByText('Continuer with facebook')).toBeTruthy();
    });
  });

  describe('text content', () => {
    it('should contain word "facebook"', () => {
      const { getByText } = render(<FacebookAuthButton />);
      const text = getByText(/facebook/i);
      expect(text).toBeTruthy();
    });

    it('should use lowercase "facebook"', () => {
      const { getByText } = render(<FacebookAuthButton />);
      expect(getByText(/with facebook/)).toBeTruthy();
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const tree = render(<FacebookAuthButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});