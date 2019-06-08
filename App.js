import React from 'react';
import AppContainer from './src/router';
import { Provider } from 'react-redux';

import store from './src/store';

// react-native-screens memory optimization
import { useScreens } from 'react-native-screens';
useScreens();

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer uriPrefix="/app" />
    </Provider>
  );
}
