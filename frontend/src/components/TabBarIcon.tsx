import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  route: any;
  focused: boolean;
  color: string;
  size: number;
}

export default function TabBarIcon({ route, focused, color, size }: TabBarIconProps) {
  let iconName: keyof typeof Ionicons.glyphMap;

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Meditation':
      iconName = focused ? 'leaf' : 'leaf-outline';
      break;
    case 'Community':
      iconName = focused ? 'people' : 'people-outline';
      break;
    case 'Library':
      iconName = focused ? 'library' : 'library-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'help-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
} 