import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/redux/store';
import { useColorScheme } from 'react-native';
import { setSystemTheme } from './src/redux/themeSlice';

const MainApp = () => {
  const dispatch = useDispatch();
  const deviceTheme = useColorScheme();
  useEffect(() => {
    dispatch(setSystemTheme(deviceTheme));
  },[deviceTheme, dispatch]);

return <AppNavigator/>;
};

const App = () => {
  return(
  <Provider store={store}>
    <MainApp />
  </Provider>
  );
};

export default App;
