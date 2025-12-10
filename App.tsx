// App.tsx

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BookmarkProvider } from './src/context/BookmarkContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { lightTheme } from './src/utils/themes';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={lightTheme.colors.surface}
      />
      <BookmarkProvider>
        <RootNavigator />
      </BookmarkProvider>
    </GestureHandlerRootView>
  );
}
