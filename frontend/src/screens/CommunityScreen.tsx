import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../config';

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>
          Connect with fellow believers
        </Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Community features coming soon...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  placeholder: {
    backgroundColor: THEME.colors.surface,
    padding: 30,
    borderRadius: 12,
    shadowColor: THEME.colors.gradientEnd,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  placeholderText: {
    color: THEME.colors.text.secondary,
    fontSize: 16,
  },
}); 