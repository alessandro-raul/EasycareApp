import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style';

import SearchBar from '../../componentes/SearchBar';
import Remedio from '../../../assets/imgs/remedio.png';
import Drogaria from '../../../assets/imgs/drogariasp.png';

export default function Pesquisa(){ 
  return(
    <>
    <SearchBar/>
    <View style={styles.container}>
      <View style={styles.contResult}>
        <Image source={Remedio} style={styles.imgProd}/>
        <View style={styles.contDesc}>
          <Text style={styles.title}>Dipirona, 20mg</Text>
          <View style={styles.descFarma}>
            <Image source={Drogaria} style={styles.imgFarma}/>
            <Text style={styles.nameFarma}>Drogaria SP</Text>
          </View>
        </View>
        <View style={styles.contPreco}>
          <Text style={styles.textAnterior}>R$ 15,00</Text>
          <Text style={styles.textPreco}>R$ 15,00</Text>
        </View>
      </View>
    </View>  
    </>
  )  
}