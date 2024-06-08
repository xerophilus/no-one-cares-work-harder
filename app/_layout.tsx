import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import { en, registerTranslation } from 'react-native-paper-dates'

import { useColorScheme } from '@/hooks/useColorScheme';
import { FirebaseProvider, useFirebase } from '@/context/firebaseContext';
import { registerForPushNotificationsAsync, } from '@/utils/notifications';
import { Platform } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  registerTranslation('en', en)

  const { user, savePushToken } = useFirebase();

  useEffect(() => {        
    if ( user ) {
      router.replace('(tabs)')
    } else {
      router.replace('/sign-in')
    }

  }, [user])

  useEffect(() => {
    const setupNotifications = async () => {
      if(Platform.OS !== 'web'){
        const token = await registerForPushNotificationsAsync();
        if (token) {
          savePushToken(user.uid, token)
        }
      }
      return 
    };

    setupNotifications();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen 
          name="sign-up" 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="sign-in"
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="forgot-password"
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="new-habit"
          options={{
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="notifications"
          options={{
            headerShown: false,
            presentation: 'modal'
          }} 
        />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Oswald-Bold': require('../assets/fonts/Oswald-Bold.ttf'),
    'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <FirebaseProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MainLayout />
      </ThemeProvider>
    </FirebaseProvider>
  );
}