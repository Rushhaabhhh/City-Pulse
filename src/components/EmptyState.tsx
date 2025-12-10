import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { lightTheme } from '../utils/themes';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📭</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
    textAlign: 'center',
  },
});
