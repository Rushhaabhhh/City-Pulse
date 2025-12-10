import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CitySelectionScreen } from '../screens/CitySelectionScreen';
import { NewsFeedScreen } from '../screens/NewsFeedScreen';
import { NewsWebViewScreen } from '../screens/NewsWebViewScreen';
import { BookmarksScreen } from '../screens/BookmarksScreen';
import { EmergencyAlertsScreen } from '../screens/EmergencyAlertsScreen';
import { lightTheme } from '../utils/themes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack: React.FC<{ selectedCity: string; onCityChange: () => void }> = ({
  selectedCity,
  onCityChange,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: lightTheme.colors.background },
      }}
    >
      <Stack.Screen
        name="NewsFeed"
        options={{ animation: 'none' }}
      >
        {(props) => (
          <NewsFeedScreen
            {...props}
            selectedCity={selectedCity}
            onCityChange={onCityChange}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="NewsWebView"
        component={NewsWebViewScreen}
        options={{
          animation: 'default',
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

const BookmarksStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: lightTheme.colors.background },
      }}
    >
      <Stack.Screen name="BookmarksList" component={BookmarksScreen} />
      <Stack.Screen
        name="NewsWebView"
        component={NewsWebViewScreen}
        options={{
          animation: 'default',
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

const AlertsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: lightTheme.colors.background },
      }}
    >
      <Stack.Screen name="AlertsList" component={EmergencyAlertsScreen} />
    </Stack.Navigator>
  );
};

const tabBarIcons = {
  News: '📰',
  Bookmarks: '🔖',
  Alerts: '🚨',
};

const TabNavigator: React.FC<{ selectedCity: string; onCityChange: () => void }> = ({
  selectedCity,
  onCityChange,
}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: lightTheme.colors.primary,
        tabBarInactiveTintColor: lightTheme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: lightTheme.colors.surface,
          borderTopColor: lightTheme.colors.border,
          paddingVertical: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="News"
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📰</Text>
          ),
          tabBarLabel: 'News',
        }}
      >
        {(props) => (
          <NewsStack selectedCity={selectedCity} onCityChange={onCityChange} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Bookmarks"
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🔖</Text>,
          tabBarLabel: 'Bookmarks',
        }}
        component={BookmarksStack}
      />

      <Tab.Screen
        name="Alerts"
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🚨</Text>,
          tabBarLabel: 'Alerts',
        }}
        component={AlertsStack}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('New York');
  const [showCitySelection, setShowCitySelection] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'default',
        }}
      >
        {showCitySelection ? (
          <Stack.Screen
            name="CitySelection"
            options={{
              animation: 'default',
            }}
          >
            {(props) => (
              <CitySelectionScreen
                onCitySelect={(city) => {
                  setSelectedCity(city);
                  setShowCitySelection(false);
                }}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="MainApp"
            options={{
              animation: 'none',
            }}
          >
            {(props) => (
              <TabNavigator
                selectedCity={selectedCity}
                onCityChange={() => setShowCitySelection(true)}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Helper to render Text for tab icons
const Text = ({ style, children }: any) => (
  <span style={style}>{children}</span>
);
