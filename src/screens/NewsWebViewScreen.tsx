import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NewsArticle } from '../types';
import { lightTheme } from '../utils/themes';
import { useBookmarks } from '../context/BookmarkContext';

interface NewsWebViewScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, 'NewsWebView'>;
}

export const NewsWebViewScreen: React.FC<NewsWebViewScreenProps> = ({
  navigation,
  route,
}) => {
  const { article } = route.params as { article: NewsArticle };
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.url);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(article.url);
      Alert.alert('Removed', 'Article removed from bookmarks');
    } else {
      addBookmark(article);
      Alert.alert('Saved', 'Article saved to bookmarks');
    }
  };

  const handleShare = () => {
    Alert.prompt(
      'Share Article',
      'Article URL copied. Share with others:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      'plain-text',
      article.url
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleShare}
            style={styles.actionButton}
          >
            <Text style={styles.actionIcon}>🔗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBookmarkToggle}
            style={styles.actionButton}
          >
            <Text style={styles.actionIcon}>
              {bookmarked ? '📌' : '🔖'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <WebView
        source={{ uri: article.url }}
        style={styles.webview}
        startInLoadingState
        useWebKit
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          Alert.alert('Error', `Failed to load page: ${nativeEvent.description}`);
        }}
      />
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.surface,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: lightTheme.colors.primary + '15',
  },
  backButtonText: {
    color: lightTheme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: lightTheme.colors.primary + '15',
  },
  actionIcon: {
    fontSize: 18,
  },
  webview: {
    flex: 1,
  },
});
