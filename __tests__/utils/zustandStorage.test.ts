import AsyncStorage from '@react-native-async-storage/async-storage';
import zustandStorage from '../../utils/zustandStorage';

describe('zustandStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItem', () => {
    it('should retrieve an item from AsyncStorage', async () => {
      const mockValue = '{"test": "data"}';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockValue);

      const result = await zustandStorage.getItem('test-key');

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toBe(mockValue);
    });

    it('should return null when item does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await zustandStorage.getItem('non-existent-key');

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(error);

      await expect(zustandStorage.getItem('error-key')).rejects.toThrow('Storage error');
    });
  });

  describe('setItem', () => {
    it('should store an item in AsyncStorage', async () => {
      const key = 'test-key';
      const value = '{"test": "data"}';

      await zustandStorage.setItem(key, value);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('should handle complex JSON strings', async () => {
      const key = 'complex-key';
      const value = JSON.stringify({ user: { id: 1, name: 'Test', nested: { data: true } } });

      await zustandStorage.setItem(key, value);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('should handle empty strings', async () => {
      await zustandStorage.setItem('empty-key', '');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('empty-key', '');
    });

    it('should handle errors during storage', async () => {
      const error = new Error('Storage full');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(error);

      await expect(zustandStorage.setItem('key', 'value')).rejects.toThrow('Storage full');
    });
  });

  describe('removeItem', () => {
    it('should remove an item from AsyncStorage', async () => {
      const key = 'test-key';

      await zustandStorage.removeItem(key);

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
    });

    it('should handle removal of non-existent keys', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

      await zustandStorage.removeItem('non-existent');

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('non-existent');
    });

    it('should handle errors during removal', async () => {
      const error = new Error('Removal error');
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(error);

      await expect(zustandStorage.removeItem('error-key')).rejects.toThrow('Removal error');
    });
  });

  describe('StateStorage interface compliance', () => {
    it('should implement all required StateStorage methods', () => {
      expect(zustandStorage).toHaveProperty('getItem');
      expect(zustandStorage).toHaveProperty('setItem');
      expect(zustandStorage).toHaveProperty('removeItem');
      expect(typeof zustandStorage.getItem).toBe('function');
      expect(typeof zustandStorage.setItem).toBe('function');
      expect(typeof zustandStorage.removeItem).toBe('function');
    });
  });
});