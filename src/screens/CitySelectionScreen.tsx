import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { CITIES } from '../config/constants';
import { storageService } from '../services/storageService';
import { lightTheme } from '../utils/themes';

interface CitySelectionScreenProps {
  onCitySelect: (cityName: string) => void;
}

export const CitySelectionScreen: React.FC<CitySelectionScreenProps> = ({
  onCitySelect,
}) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSelectedCity();
  }, []);

  const loadSelectedCity = async () => {
    try {
      const saved = await storageService.loadSelectedCity();
      setSelectedCity(saved);
    } catch (error) {
      console.error('Error loading selected city:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = async (cityName: string) => {
    try {
      setSelectedCity(cityName);
      await storageService.saveSelectedCity(cityName);
      onCitySelect(cityName);
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={lightTheme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>City Pulse</Text>
        <Text style={styles.subtitle}>Select a city to get started</Text>
      </View>

      <FlatList
        data={CITIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.cityButton,
              selectedCity === item.name && styles.cityButtonActive,
            ]}
            onPress={() => handleSelectCity(item.name)}
          >
            <Text
              style={[
                styles.cityButtonText,
                selectedCity === item.name && styles.cityButtonTextActive,
              ]}
            >
              {item.name}
            </Text>
            {selectedCity === item.name && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: lightTheme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: lightTheme.colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 6,
  },
  cityButton: {
    flex: 0.48,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: lightTheme.colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: lightTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  cityButtonActive: {
    backgroundColor: lightTheme.colors.primary,
    borderColor: lightTheme.colors.primary,
  },
  cityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: lightTheme.colors.text,
    textAlign: 'center',
  },
  cityButtonTextActive: {
    color: '#ffffff',
  },
  checkmark: {
    fontSize: 18,
    marginTop: 4,
  },
});
