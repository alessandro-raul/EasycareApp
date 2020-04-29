import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import FootPular from '../componentes/FootPular';

import logo from '../../assets/imgs/icon2.png';

export default function PreLog({navigation}){
  function navigateToHome(){
    navigation.navigate('Home');
  }

  function navigateToLogin(){
    navigation.navigate('TelaLogin')
  }
    return(
        <>
         <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <View style={styles.container} >
            <Text style={styles.title} >Easycare</Text>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.subTitle} >Olá, bem vindo!</Text>
            <Text style={styles.textEscolha} >Escolha uma forma de acesso</Text>

            <TouchableOpacity style={styles.btCont} onPress={navigateToLogin}>
                <View style={styles.icons}>
                <Icon style={styles.iconEmail} name={'envelope'} size={16} color= 'rgba(0,0,0,0.7)' />
                </View>
                <Text style={styles.btText} >Acessar com Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btCont} >
                <View style={styles.icons}>
                <Icon style={styles.iconFace} name={'facebook-f'} size={16} color= 'rgba(0,0,0,0.7)' /> 
                </View>
                <Text style={styles.btText} >Acessar com Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btCont} >
                <View style={styles.icons}>
                <Icon style={styles.iconGoogle} name={'google'} size={16} color= 'rgba(0,0,0,0.7)' />
                </View>
                <Text style={styles.btText} >Acessar com Google</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.bt}>
                <View style={styles.btPular}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Text style={styles.txtPular}>Pular</Text>
                </TouchableOpacity>
                </View>
            </View>
      </>

    )
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: { 
    fontSize: 37,
    fontFamily: 'CaviarDreams',
    fontWeight: '100',
    color: '#23AFDB',
  },
  logo: {
    width: 130,
    height: 130,
    marginTop: 20,
    marginBottom:20,

  },
  subTitle: {
    fontFamily: 'CaviarDreams',
    fontSize: 24,
    //fontWeight: 'bold',
    color: '#23AFDB',
  },
  textEscolha: {
    marginTop:4,
    marginBottom: 32,
    fontFamily: 'CaviarDreams',
    fontSize: 20,
    //color: '#707070',
  },
  btCont: {
    height: 50,
    width: "85%",
    marginBottom: 22,
    flexDirection: 'row', 
    alignItems: 'center',
    //justifyContent: 'center',
    borderWidth: 1,
    
    borderColor: "rgba(60,60,60, 0.4)",
    borderRadius: 50,
  },
  icons:{
    width:80,
    alignItems: 'center',
    //backgroundColor: '#333'
  },
  /*
  iconEmail:{
    Color: '#23AFDB',
  },
  iconFace:{
    Color: '#23AFDB',
  },
  iconGoogle:{
    Color: '#23AFDB',
  },
  */
  btText: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    color: '#707070',
    fontSize: 14,
    borderColor: '#707070',
  },

  btPular:{
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
},

txtPular:{
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#707070',
    fontSize: 16
}


});