import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsArticle } from '../types';
import { STORAGE_KEYS } from '../config/constants';

class StorageService {
  /**
   * Save bookmarks to AsyncStorage
   */
  async saveBookmarks(bookmarks: NewsArticle[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
      throw error;
    }
  }

  /**
   * Load bookmarks from AsyncStorage
   */
  async loadBookmarks(): Promise<NewsArticle[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  }

  /**
   * Save selected city
   */
  async saveSelectedCity(cityName: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CITY, cityName);
    } catch (error) {
      console.error('Error saving selected city:', error);
      throw error;
    }
  }

  /**
   * Load selected city
   */
  async loadSelectedCity(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
    } catch (error) {
      console.error('Error loading selected city:', error);
      return null;
    }
  }

  /**
   * Save theme preference
   */
  async saveThemePreference(theme: 'light' | 'dark' | 'auto'): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
      throw error;
    }
  }

  /**
   * Load theme preference
   */
  async loadThemePreference(): Promise<'light' | 'dark' | 'auto'> {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE);
      return (theme as 'light' | 'dark' | 'auto') || 'auto';
    } catch (error) {
      console.error('Error loading theme preference:', error);
      return 'auto';
    }
  }

  /**
   * Clear all data
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.BOOKMARKS,
        STORAGE_KEYS.SELECTED_CITY,
        STORAGE_KEYS.THEME_PREFERENCE,
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
