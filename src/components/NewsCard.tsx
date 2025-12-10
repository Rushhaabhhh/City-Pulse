// src/components/NewsCard.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NewsArticle } from '../types';
import { formatDate, truncateText, getDomain, isValidImageUrl } from '../utils/helpers';
import { lightTheme } from '../utils/themes';
import { useBookmarks } from '../context/BookmarkContext';

interface NewsCardProps {
  article: NewsArticle;
  onPress: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.url);
  const hasImage = isValidImageUrl(article.image);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {hasImage && (
        <Image source={{ uri: article.image || undefined }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.source}>{getDomain(article.url).toUpperCase()}</Text>
          <Text style={styles.date}>{formatDate(article.date)}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        {article.description && (
          <Text style={styles.description} numberOfLines={2}>
            {truncateText(article.description, 120)}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.authorContainer}>
            {article.author && (
              <Text style={styles.author} numberOfLines={1}>
                by {truncateText(article.author, 30)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleBookmarkToggle}
          >
            <Text style={styles.bookmarkIcon}>
              {bookmarked ? '📌' : '🔖'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: lightTheme.colors.border,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 11,
    fontWeight: '700',
    color: lightTheme.colors.primary,
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    color: lightTheme.colors.textSecondary,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: 6,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    color: lightTheme.colors.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flex: 1,
  },
  author: {
    fontSize: 11,
    color: lightTheme.colors.textSecondary,
    fontStyle: 'italic',
  },
  bookmarkButton: {
    padding: 6,
    marginLeft: 8,
  },
  bookmarkIcon: {
    fontSize: 18,
  },
});
