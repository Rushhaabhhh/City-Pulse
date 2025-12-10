import React, { createContext, useContext, useEffect, useCallback, useReducer } from 'react';
import { NewsArticle, BookmarkState } from '../types';
import { storageService } from '../services/storageService';

interface BookmarkAction {
  type: 'ADD' | 'REMOVE' | 'SET' | 'LOAD';
  payload?: NewsArticle | string | NewsArticle[];
}

const BookmarkContext = createContext<BookmarkState | undefined>(undefined);

const bookmarkReducer = (state: NewsArticle[], action: BookmarkAction): NewsArticle[] => {
  switch (action.type) {
    case 'ADD': {
      const article = action.payload as NewsArticle;
      const exists = state.some((a) => a.url === article.url);
      return exists ? state : [article, ...state];
    }
    case 'REMOVE': {
      const url = action.payload as string;
      return state.filter((a) => a.url !== url);
    }
    case 'SET': {
      return (action.payload as NewsArticle[]) || [];
    }
    case 'LOAD': {
      return (action.payload as NewsArticle[]) || [];
    }
    default:
      return state;
  }
};

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, dispatch] = useReducer(bookmarkReducer, []);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load bookmarks on mount
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const savedBookmarks = await storageService.loadBookmarks();
        dispatch({ type: 'LOAD', payload: savedBookmarks });
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  // Persist bookmarks whenever they change
  useEffect(() => {
    if (!isLoading) {
      storageService.saveBookmarks(bookmarks).catch((error) => {
        console.error('Failed to save bookmarks:', error);
      });
    }
  }, [bookmarks, isLoading]);

  const addBookmark = useCallback((article: NewsArticle) => {
    dispatch({ type: 'ADD', payload: article });
  }, []);

  const removeBookmark = useCallback((articleUrl: string) => {
    dispatch({ type: 'REMOVE', payload: articleUrl });
  }, []);

  const isBookmarked = useCallback(
    (articleUrl: string) => bookmarks.some((a) => a.url === articleUrl),
    [bookmarks]
  );

  const value: BookmarkState = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export const useBookmarks = (): BookmarkState => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};
