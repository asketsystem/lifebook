import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../config';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Friend</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>
        </View>
        
        <View style={styles.moodSection}>
          <Text style={styles.sectionTitle}>Select Your Mood</Text>
          <View style={styles.moodContainer}>
            <Text style={styles.moodPlaceholder}>Mood picker coming soon...</Text>
          </View>
        </View>

        <View style={styles.verseSection}>
          <Text style={styles.sectionTitle}>Today's Verse</Text>
          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>
              "For I know the plans I have for you," declares the LORD, 
              "plans to prosper you and not to harm you, plans to give 
              you hope and a future."
            </Text>
            <Text style={styles.verseReference}>- Jeremiah 29:11</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionContainer}>
            <Text style={styles.actionPlaceholder}>Meditation • Prayer • Journal</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.text.secondary,
  },
  moodSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME.colors.accent,
    marginBottom: 15,
  },
  moodContainer: {
    backgroundColor: THEME.colors.surface,
    padding: 20,
    borderRadius: 12,
    shadowColor: THEME.colors.gradientEnd,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  moodPlaceholder: {
    textAlign: 'center',
    color: THEME.colors.text.secondary,
    fontSize: 16,
  },
  verseSection: {
    padding: 20,
    paddingTop: 0,
  },
  verseContainer: {
    backgroundColor: THEME.colors.surface,
    padding: 20,
    borderRadius: 12,
    shadowColor: THEME.colors.gradientStart,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  verseText: {
    fontSize: 16,
    color: THEME.colors.text.primary,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  verseReference: {
    fontSize: 14,
    color: THEME.colors.accent,
    textAlign: 'right',
  },
  quickActions: {
    padding: 20,
    paddingTop: 0,
  },
  actionContainer: {
    backgroundColor: THEME.colors.surface,
    padding: 20,
    borderRadius: 12,
    shadowColor: THEME.colors.gradientEnd,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  actionPlaceholder: {
    textAlign: 'center',
    color: THEME.colors.text.secondary,
    fontSize: 16,
  },
}); 