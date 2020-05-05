import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import InputComIconQuad from '../../componentes/InputComIconQuad';
import SearchBar from '../../componentes/SearchBar';

export default function Pesquisa(){ 
  return(
    <>
    <SearchBar cor={'#23AFDB'}/>
    <View style={styles.container}>
      <View style={{width: '100%', height: '90%', alignItems: 'center',justifyContent: 'center'}}>
        <Text>Pesquise um Medicamento</Text>
      </View>  
    </View>  
    </>
  )   
}