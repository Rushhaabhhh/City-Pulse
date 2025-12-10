import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { NewsArticle } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import { NewsCard } from '../components/NewsCard';
import { EmptyState } from '../components/EmptyState';
import { lightTheme } from '../utils/themes';
import { searchArticles } from '../utils/helpers';

interface BookmarksScreenProps {
  navigation: NavigationProp<any>;
}

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ navigation }) => {
  const { bookmarks } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const filtered = searchArticles(bookmarks, searchQuery);
    setFilteredBookmarks(filtered);
  }, [searchQuery, bookmarks]);

  const handleArticlePress = (article: NewsArticle) => {
    navigation.navigate('NewsWebView', { article });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.count}>{bookmarks.length}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search bookmarks..."
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

      {filteredBookmarks.length === 0 ? (
        <EmptyState
          title={bookmarks.length === 0 ? 'No Bookmarks Yet' : 'No Results'}
          description={
            bookmarks.length === 0
              ? 'Tap the bookmark icon to save articles'
              : 'Try different search terms'
          }
        />
      ) : (
        <FlatList
          data={filteredBookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsCard article={item} onPress={() => handleArticlePress(item)} />
          )}
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
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: lightTheme.colors.primary,
    backgroundColor: lightTheme.colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
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
});
