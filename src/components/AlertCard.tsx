// src/components/AlertCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmergencyAlert } from '../types';
import { formatDate } from '../utils/helpers';
import { lightTheme, severityColors, alertTypeColors } from '../utils/themes';

interface AlertCardProps {
  alert: EmergencyAlert;
}

const alertTypeEmojis: Record<string, string> = {
  flood: '🌊',
  fire: '🔥',
  earthquake: '⚡',
  weather: '🌩️',
  accident: '🚗',
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const severityColor = severityColors[alert.severity];
  const emoji = alertTypeEmojis[alert.type] || '⚠️';

  return (
    <View
      style={[
        styles.card,
        { borderLeftColor: severityColor },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{alert.title}</Text>
          <Text
            style={[
              styles.severity,
              { color: severityColor },
            ]}
          >
            {alert.severity.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.location}>📍 {alert.location}</Text>
      <Text style={styles.description}>{alert.description}</Text>
      <Text style={styles.timestamp}>{formatDate(alert.timestamp)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: lightTheme.colors.text,
    marginBottom: 4,
  },
  severity: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  location: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
    marginBottom: 6,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    color: lightTheme.colors.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 11,
    color: lightTheme.colors.textSecondary,
  },
});
