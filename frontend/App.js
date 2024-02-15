import { StatusBar } from 'expo-status-bar';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';


export default function App() {
  const [statusBarColor, setStatusBarColor] = useState('dark');
  const currentColorScheme = Appearance.getColorScheme();

  useEffect(() => {
    const changeStatusBarColor = async () => {
      NavigationBar.setBackgroundColorAsync('#FFFFFF');
      NavigationBar.setButtonStyleAsync("dark");
    }
    changeStatusBarColor();
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style={statusBarColor} />
      <Navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
