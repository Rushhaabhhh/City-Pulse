import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { NewsArticle } from '../types';
import { newsService } from '../services/newsService';
import { NewsCard } from '../components/NewsCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { lightTheme } from '../utils/themes';
import { deduplicateArticles, searchArticles } from '../utils/helpers';

interface NewsFeedScreenProps {
  navigation: NavigationProp<any>;
  selectedCity: string;
  onCityChange: () => void;
}

export const NewsFeedScreen: React.FC<NewsFeedScreenProps> = ({
  navigation,
  selectedCity,
  onCityChange,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [selectedCity]);

  useEffect(() => {
    const filtered = searchArticles(articles, searchQuery);
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  const fetchNews = async (pageNum: number = 1) => {
    try {
      setIsLoading(pageNum === 1);
      setError(null);
      const data = await newsService.fetchNewsByCity(selectedCity, pageNum);
      const unique = deduplicateArticles(
        pageNum === 1 ? data : [...articles, ...data]
      );
      setArticles(unique);
      setPage(pageNum);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchNews(1);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && articles.length >= 20) {
      fetchNews(page + 1);
    }
  };

  const handleArticlePress = (article: NewsArticle) => {
    navigation.navigate('NewsWebView', { article });
  };

  if (error && articles.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchNews()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{selectedCity}</Text>
          <Text style={styles.subtitle}>Latest News</Text>
        </View>
        <TouchableOpacity onPress={onCityChange}>
          <Text style={styles.changeButton}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search news..."
          placeholderTextColor={lightTheme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {isLoading && articles.length === 0 ? (
        <LoadingSpinner fullScreen />
      ) : filteredArticles.length === 0 ? (
        <EmptyState
          title="No Articles Found"
          description={searchQuery ? 'Try different search terms' : 'No news available'}
        />
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsCard article={item} onPress={() => handleArticlePress(item)} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={lightTheme.colors.primary}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading && articles.length > 0 ? (
              <LoadingSpinner size="small" />
            ) : null
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: lightTheme.colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
    marginTop: 2,
  },
  changeButton: {
    fontSize: 13,
    fontWeight: '600',
    color: lightTheme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: lightTheme.colors.primary + '15',
    borderRadius: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: lightTheme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: lightTheme.colors.text,
  },
  clearIcon: {
    fontSize: 16,
    color: lightTheme.colors.textSecondary,
    padding: 4,
  },
  listContent: {
    paddingVertical: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: lightTheme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: lightTheme.colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
