import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    backgroundColor: '#f8f9fa',
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
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  moodSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  moodContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodPlaceholder: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
  },
  verseSection: {
    padding: 20,
    paddingTop: 0,
  },
  verseContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  verseReference: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  quickActions: {
    padding: 20,
    paddingTop: 0,
  },
  actionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionPlaceholder: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
  },
}); 