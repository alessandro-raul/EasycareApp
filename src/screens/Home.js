import React, {Component} from 'react';
import Header from '../componentes/Header';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Introducao from '../screens/IntrodutionAppScroll';
import { View, Button, Text, StatusBar } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
export default function Home({ navigation }) {
  
  function navigateToInicio(){
    navigation.navigate('Introducao');
  }
  
  return(
    <>
      <Header text="Easycare"/>
      <StatusBar backgroundColor='white'/>
      <TouchableHighlight onPress={navigateToInicio}>
        <Text>
          Introdução
        </Text>
      </TouchableHighlight>
    </>
   
    
    )
}