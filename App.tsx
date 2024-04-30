import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  </SafeAreaProvider>
);

export default App;
