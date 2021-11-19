import React from 'react';
import { Provider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import Navigation from './components/MainNavigation';
export default function App() {
  return (
    <Provider>
      <Navigation />
      <StatusBar />
    </Provider>
  );
}
