import React from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"/>
      <Routes />
    </NavigationContainer>
   
  );
}