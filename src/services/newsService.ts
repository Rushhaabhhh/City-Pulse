import { api } from '../config/api';
import { NEWS_PAGE_SIZE } from '../config/constants';
import type { NewsArticle } from '../types/index';

type GNewsArticle = {
  title: string;
  description?: string | null;
  content?: string | null;
  image?: string | null;
  url: string;
  source?: {
    name?: string;
    url?: string;
  };
  publishedAt: string;
};

type GNewsResponse = {
  totalArticles: number;
  articles: GNewsArticle[];
};

class NewsService {
  private transformArticle(article: GNewsArticle): NewsArticle {
    return {
      id: article.url,
      title: article.title,
      description: article.description || '',
      url: article.url,
      image: article.image || null,
      source: article.source?.name || 'Unknown',
      author: article.source?.name || 'Unknown',
      date: article.publishedAt,
      content: article.content || null,
    };
  }

  async fetchNewsByCity(
    city: string,
    page: number = 1,
    sortBy: string = 'publishedAt'
  ): Promise<NewsArticle[]> {
    try {
      const response = await api.get<GNewsResponse>('/search', {
        params: {
          q: city,
          lang: 'en',
          sortby: sortBy === 'publishedAt' ? 'publishedat' : 'relevance',
          max: NEWS_PAGE_SIZE,
          expand: 'content',
        },
      });

      if (response.articles && Array.isArray(response.articles)) {
        return response.articles.map((article) => this.transformArticle(article));
      }

      return [];
    } catch (error) {
      console.error('Error fetching news from GNews:', error);
      throw error;
    }
  }

  async searchNews(query: string, page: number = 1): Promise<NewsArticle[]> {
    try {
      const response = await api.get<GNewsResponse>('/search', {
        params: {
          q: query,
          lang: 'en',
          sortby: 'publishedat',
          max: NEWS_PAGE_SIZE,
          expand: 'content',
        },
      });

      if (response.articles && Array.isArray(response.articles)) {
        return response.articles.map((article) => this.transformArticle(article));
      }

      return [];
    } catch (error) {
      console.error('Error searching news from GNews:', error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
