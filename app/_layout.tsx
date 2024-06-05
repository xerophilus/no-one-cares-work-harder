import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContextProvider, useAuth } from '@/context/authContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthed } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if(typeof isAuthed == 'undefined') return;
    
    const inApp = segments[0] == 'drawer';
    const inRecipe = segments[0] == 'Recipe';

    if ( isAuthed && !inApp && !inRecipe ) {
      router.replace('(tabs)')
    } else if ( isAuthed === false ) {
      router.replace('/sign-in')
    }

  }, [isAuthed])

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
    <AuthContextProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MainLayout />
      </ThemeProvider>
    </AuthContextProvider>
  );
}