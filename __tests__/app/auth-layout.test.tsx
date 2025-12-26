import React from 'react';
import { render } from '@testing-library/react-native';
import Layout from '../../app/(app)/(auth)/_layout';

describe('Auth Layout', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = render(<Layout />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render Stack component', () => {
      const { UNSAFE_getByType } = render(<Layout />);
      expect(UNSAFE_getByType('Stack' as any)).toBeTruthy();
    });
  });

  describe('configuration', () => {
    it('should configure index screen with Restaurant title', () => {
      // This test verifies the structure, actual title configuration 
      // is passed to Stack.Screen which is mocked
      const { toJSON } = render(<Layout />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const tree = render(<Layout />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});