import AsyncStorage from '@react-native-async-storage/async-storage';

import type { NewsArticle } from '../types/index';

const STORAGE_KEYS = {
  BOOKMARKS: '@city_pulse/bookmarks',
  SELECTED_CITY: '@city_pulse/selected_city',
  LAST_UPDATED: '@city_pulse/last_updated',
} as const;

class StorageService {
  /**
   * Save bookmarks to AsyncStorage
   */
  async saveBookmarks(bookmarks: NewsArticle[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATED, new Date().toISOString());
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
      return data ? JSON.parse(data) as NewsArticle[] : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  }

  /**
   * Clear all bookmarks
   */
  async clearBookmarks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_UPDATED);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      throw error;
    }
  }

  /**
   * Save selected city
   */
  async saveSelectedCity(city: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CITY, city);
    } catch (error) {
      console.error('Error saving selected city:', error);
      throw error;
    }
  }

  /**
   * Load selected city (defaults to 'New York')
   */
  async loadSelectedCity(): Promise<string> {
    try {
      const city = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
      return city || 'New York';
    } catch (error) {
      console.error('Error loading selected city:', error);
      return 'New York';
    }
  }

  /**
   * Get last updated timestamp
   */
  async getLastUpdated(): Promise<Date | null> {
    try {
      const timestamp = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATED);
      return timestamp ? new Date(timestamp) : null;
    } catch (error) {
      console.error('Error getting last updated:', error);
      return null;
    }
  }
}

export const storageService = new StorageService();
