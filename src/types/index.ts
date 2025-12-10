export interface NewsArticle {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    url: string;
    date: string;
    source: string;
    content: string | null;
    author: string | null;
  }
  
  export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Array<{
      source: { id: string | null; name: string };
      author: string | null;
      title: string;
      description: string | null;
      url: string;
      urlToImage: string | null;
      publishedAt: string;
      content: string | null;
    }>;
  }
  
  export interface EmergencyAlert {
    id: string;
    type: 'flood' | 'fire' | 'earthquake' | 'weather' | 'accident';
    title: string;
    description: string;
    location: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }
  
  export interface City {
    id: string;
    name: string;
    query: string;
  }
  
  export type BookmarkState = {
    bookmarks: NewsArticle[];
    addBookmark: (article: NewsArticle) => void;
    removeBookmark: (articleUrl: string) => void;
    isBookmarked: (articleUrl: string) => boolean;
  };