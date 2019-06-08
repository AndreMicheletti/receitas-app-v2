import React from 'react';
import AppContainer from './src/router';

// react-native-screens memory optimization
import { useScreens } from 'react-native-screens';
useScreens();

export default function App() {
  return (
    <AppContainer uriPrefix="/app" />
  );
}
