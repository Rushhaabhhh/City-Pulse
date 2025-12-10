export const CITIES: { id: string; name: string; query: string }[] = [
    { id: '1', name: 'New York', query: 'New York' },
    { id: '2', name: 'London', query: 'London' },
    { id: '3', name: 'Tokyo', query: 'Tokyo' },
    { id: '4', name: 'Paris', query: 'Paris' },
    { id: '5', name: 'Sydney', query: 'Sydney' },
    { id: '6', name: 'Dubai', query: 'Dubai' },
    { id: '7', name: 'Singapore', query: 'Singapore' },
    { id: '8', name: 'Mumbai', query: 'Mumbai' },
    { id: '9', name: 'Berlin', query: 'Berlin' },
    { id: '10', name: 'Toronto', query: 'Toronto' },
  ];
  
  export const NEWS_API_BASE_URL = process.env.EXPO_PUBLIC_NEWS_API_BASE_URL;
  
  export const STORAGE_KEYS = {
    BOOKMARKS: '@citypulse:bookmarks',
    SELECTED_CITY: '@citypulse:selected_city',
    THEME_PREFERENCE: '@citypulse:theme',
  };
  
  export const NEWS_PAGE_SIZE = 20;
  export const REQUEST_TIMEOUT = 10000; // 10 seconds
  
  export const SORT_BY_OPTIONS = ['relevancy', 'popularity', 'publishedAt'] as const;
  export const DEFAULT_SORT_BY = 'publishedAt';