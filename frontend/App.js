import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation.js';

export default function App() {
  //const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <StatusBar
        style='light'
        backgroundColor='black'
      />
      <View style={styles.container}>
        <Navigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
