// src/components/LoadingSpinner.tsx

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { lightTheme } from '../utils/themes';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = lightTheme.colors.primary,
  fullScreen = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        fullScreen && { flex: 1, justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
