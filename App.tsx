import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { GameScreen } from './src/screens/GameScreen';
import { MenuScreen } from './src/screens/MenuScreen';

export type RootStackParamList = {
  Menu: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: { backgroundColor: '#10131a' },
          headerTintColor: '#f1f5ff',
          contentStyle: { backgroundColor: '#10131a' },
        }}
      >
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Ghost Loop' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
