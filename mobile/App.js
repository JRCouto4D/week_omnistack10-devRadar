import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s)'
]);

export default function App() {
  return(
    <>
    <StatusBar barStyle='ligth-content' backgroundColor="#7D40E7" />
    <Routes />
    </>
  );
}