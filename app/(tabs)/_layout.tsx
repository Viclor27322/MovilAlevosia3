import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        tabBarStyle: { backgroundColor: '#000000' }, // Fondo negro para la barra de pestañas
        headerShown: false,
      }}>

      {/* Pantalla inicial: Home */}
      <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />

      <Tabs.Screen
        name="hombres"
        options={{
          title: 'Hombres',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'rocket-sharp' : 'rocket-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mujeres"
        options={{
          title: 'Mujeres',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'rose-sharp' : 'rose-outline'} color={color} />
          ),
        }}
      />
      {/* Pantalla de Quiénes Somos */}
      <Tabs.Screen
        name="quienesSomos"
        options={{
          title: 'Quiénes Somos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />


    </Tabs>
  );
}
