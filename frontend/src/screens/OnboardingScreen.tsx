import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../config';
import { useAuth } from '../contexts/AuthContext';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons, FontAwesome5, Ionicons, Feather, Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: 'mood',
    title: 'Mood Selection',
    description: 'Check in with your feelings and let LifeBook guide your spiritual journey.',
    illustration: (
      <Animatable.View animation="fadeInLeft" duration={800}>
        <MaterialCommunityIcons name="emoticon-happy-outline" size={90} color={THEME.colors.primary} />
      </Animatable.View>
    ),
  },
  {
    key: 'ai',
    title: 'AI-Personalized Content',
    description: 'Receive daily Bible verses, meditations, and prayers tailored to your mood.',
    illustration: (
      <Animatable.View animation="fadeInLeft" duration={800}>
        <Ionicons name="sparkles-outline" size={90} color={THEME.colors.accent} />
      </Animatable.View>
    ),
  },
  {
    key: 'meditation',
    title: 'Guided Meditation',
    description: 'Enjoy calming, faith-based meditations with soothing audio and visuals.',
    illustration: (
      <Animatable.View animation="fadeInLeft" duration={800}>
        <Feather name="wind" size={90} color={THEME.colors.gradientEnd} />
      </Animatable.View>
    ),
  },
  {
    key: 'community',
    title: 'Community',
    description: 'Join prayer groups, share requests, and connect with fellow believers.',
    illustration: (
      <Animatable.View animation="fadeInLeft" duration={800}>
        <FontAwesome5 name="users" size={90} color={THEME.colors.primary} />
      </Animatable.View>
    ),
  },
  {
    key: 'progress',
    title: 'Progress Tracking',
    description: 'Track your spiritual growth, streaks, and favorite moments.',
    illustration: (
      <Animatable.View animation="fadeInLeft" duration={800}>
        <Entypo name="bar-graph" size={90} color={THEME.colors.accent} />
      </Animatable.View>
    ),
  },
  {
    key: 'library',
    title: 'Library',
    description: 'Explore devotionals, Christian books, and resources for every season.',
    illustration: (
      <Animatable.View animation="fadeInLeft" duration={800}>
        <MaterialCommunityIcons name="book-open-page-variant-outline" size={90} color={THEME.colors.gradientEnd} />
      </Animatable.View>
    ),
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const { updateUserProfile, profile, setLocalOnboarding } = useAuth();

  const handleNext = () => {
    if (index < slides.length - 1) setIndex(index + 1);
  };
  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };
  const handleFinish = async () => {
    console.log('handleFinish called, profile:', !!profile);
    if (profile) {
      // Existing user - update their profile
      console.log('Updating existing user profile');
      await updateUserProfile({ hasCompletedOnboarding: true });
    } else {
      // New user - store onboarding completion locally
      console.log('Storing onboarding completion locally for new user');
      await setLocalOnboarding(true);
    }
    console.log('handleFinish completed');
  };

  const slide = slides[index];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoCornerContainer}>
        <Image source={require('../../assets/lifebook-logo.png')} style={styles.logoCorner} resizeMode="contain" />
      </View>
      <View style={styles.fullScreen}>
        <View style={styles.rightColumn}>
          <Animatable.View animation="fadeInUp" duration={700} style={styles.illustrationContainer}>
            {slide.illustration}
          </Animatable.View>
          <Animatable.Text animation="fadeInUp" delay={200} duration={700} style={styles.title}>{slide.title}</Animatable.Text>
          <Animatable.Text animation="fadeInUp" delay={400} duration={700} style={styles.description}>{slide.description}</Animatable.Text>
          <View style={[styles.buttonRow, index === 0 ? styles.buttonRowCentered : styles.buttonRowSpaced]}>
            {index > 0 ? (
              <>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                {index < slides.length - 1 ? (
                  <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Next</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.getStartedButton} onPress={handleFinish}>
                    <Text style={styles.getStartedText}>Get Started</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity style={styles.fullWidthNextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.dotsRow}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoCornerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    padding: THEME.spacing.lg,
  },
  logoCorner: {
    width: 48,
    height: 48,
  },
  fullScreen: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumn: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.lg,
  },
  illustrationContainer: {
    marginBottom: THEME.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.colors.primary,
    textAlign: 'center',
    marginBottom: THEME.spacing.md,
  },
  description: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginBottom: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
    width: '100%',
    paddingHorizontal: THEME.spacing.lg,
  },
  buttonRowCentered: {
    justifyContent: 'center',
  },
  buttonRowSpaced: {
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.colors.primary,
  },
  backButtonText: {
    color: THEME.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 160,
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  fullWidthNextButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: THEME.colors.primary,
    width: 18,
  },
}); 