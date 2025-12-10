import { NewsArticle } from '../types';

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string | null | undefined, maxLength: number = 100): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Get first letter for fallback avatar
 */
export const getInitials = (text: string | null | undefined): string => {
  if (!text) return '?';
  return text.charAt(0).toUpperCase();
};

/**
 * Check if image URL is valid
 */
export const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

/**
 * Get domain from URL
 */
export const getDomain = (url: string | null | undefined): string => {
  if (!url) return 'Unknown';
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'Unknown';
  }
};

/**
 * Deduplicate articles by URL
 */
export const deduplicateArticles = (articles: NewsArticle[]): NewsArticle[] => {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.url)) return false;
    seen.add(article.url);
    return true;
  });
};

/**
 * Search articles locally
 */
export const searchArticles = (articles: NewsArticle[], query: string): NewsArticle[] => {
  if (!query.trim()) return articles;
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description?.toLowerCase().includes(lowerQuery) ||
      article.source.toLowerCase().includes(lowerQuery)
  );
};
