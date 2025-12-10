import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { EmergencyAlert } from '../types';
import { AlertCard } from '../components/AlertCard';
import { EmptyState } from '../components/EmptyState';
import { lightTheme } from '../utils/themes';

// Mock data - in production, this would come from an API
const MOCK_ALERTS: EmergencyAlert[] = [
  {
    id: '1',
    type: 'flood',
    title: 'Flood Warning',
    description: 'Heavy rainfall expected. Residents advised to evacuate low-lying areas.',
    location: 'Downtown District',
    severity: 'high',
    timestamp: new Date().toISOString(),
    coordinates: { latitude: 40.7128, longitude: -74.006 },
  },
  {
    id: '2',
    type: 'weather',
    title: 'Storm Advisory',
    description: 'Severe thunderstorm with strong winds approaching. Stay indoors.',
    location: 'Central Zone',
    severity: 'medium',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    coordinates: { latitude: 40.7258, longitude: -74.0096 },
  },
  {
    id: '3',
    type: 'fire',
    title: 'Fire Alert',
    description: 'Wildfire spreading in suburban area. Evacuation routes activated.',
    location: 'Northern Ridge',
    severity: 'critical',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    coordinates: { latitude: 40.7580, longitude: -73.9855 },
  },
  {
    id: '4',
    type: 'earthquake',
    title: 'Seismic Activity',
    description: '3.2 magnitude earthquake detected. No immediate danger reported.',
    location: 'West Central',
    severity: 'low',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    coordinates: { latitude: 40.7489, longitude: -73.9680 },
  },
];

interface EmergencyAlertsScreenProps {}

export const EmergencyAlertsScreen: React.FC<EmergencyAlertsScreenProps> = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    // Simulate loading delay
    setTimeout(() => {
      setAlerts(MOCK_ALERTS);
    }, 300);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAlerts();
    setRefreshing(false);
  };

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical');
  const highAlerts = alerts.filter((a) => a.severity === 'high');
  const mediumAlerts = alerts.filter((a) => a.severity === 'medium');
  const lowAlerts = alerts.filter((a) => a.severity === 'low');

  const renderSection = (title: string, data: EmergencyAlert[], icon: string) => {
    if (data.length === 0) return null;

    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>{icon}</Text>
          <Text style={styles.sectionTitle}>
            {title} ({data.length})
          </Text>
        </View>
        {data.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Alerts</Text>
        <Text style={styles.subtitle}>Active alerts in your area</Text>
      </View>

      {alerts.length === 0 ? (
        <EmptyState
          title="No Active Alerts"
          description="Your area is safe. Check back for updates."
        />
      ) : (
        <FlatList
          data={[]}
          renderItem={() => null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={lightTheme.colors.primary}
            />
          }
          ListHeaderComponent={
            <>
              {renderSection('🚨 Critical', criticalAlerts, '')}
              {renderSection('⚠️ High Priority', highAlerts, '')}
              {renderSection('⚡ Medium', mediumAlerts, '')}
              {renderSection('ℹ️ Low Priority', lowAlerts, '')}
            </>
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
  listContent: {
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: lightTheme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
    marginTop: 8,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: lightTheme.colors.text,
  },
});
