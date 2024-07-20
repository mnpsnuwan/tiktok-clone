import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './Apps/Screens/LoginScreen/LoginScreen';
import HomeScreen from './Apps/Screens/Home/HomeScreen';

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo"

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    UbuntuRegular: require('./assets/fonts/ubuntu/Ubuntu-Regular.ttf'),
    UbuntuBold: require('./assets/fonts/ubuntu/Ubuntu-Bold.ttf'),
    UbuntuItalic: require('./assets/fonts/ubuntu/Ubuntu-Italic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <View style={styles.container}>
      <SignedIn>
        <HomeScreen />
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
      </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
