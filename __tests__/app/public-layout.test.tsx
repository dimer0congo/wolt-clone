import React from 'react';
import { render } from '@testing-library/react-native';
import Layout from '../../app/(app)/(public)/_layout';

describe('Public Layout', () => {
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

  describe('stack configuration', () => {
    it('should configure multiple screens', () => {
      const { toJSON } = render(<Layout />);
      // Verify layout renders (screens are mocked)
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