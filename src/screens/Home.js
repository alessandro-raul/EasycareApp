import React from 'react';
import Header from '../componentes/Header';
import { Text, StatusBar } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
  
navigateToInicio();

  function navigateToInicio(){
    navigation.navigate('Introducao');
  }
  
  return(
    <>
      <Header text="Easycare"/>
      <StatusBar backgroundColor='white'/>
      <TouchableHighlight onPress={navigateToInicio}>
        <Text>Introdução</Text>
      </TouchableHighlight>
    </>
  )
}