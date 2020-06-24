import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';
import Header from '../../componentes/Header';
import Logo from '../../../assets/imgs/iconeCortado.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';

export default function TelaSac({navigation}){
    return(
    <>
    <Header text="Ajuda"/>
    <View style={styles.container}>
        <View style={styles.viewTxt1}>
            <Text style={styles.txt1}>Encontrou algum problema? Entre em contato conosco, estamos a sua disposição!</Text>
        </View>
        <View style={styles.viewTxt1}>
            <Image source={Logo} style={styles.logoImg}/>
        </View>
        <View style={styles.viewTxt2}>
            <IconFeather name="mail" size={18} color="#23AFDB"/>
            <Text style={styles.txt2}>empresapyxisltda@gmail.com</Text>
        </View>
        <View style={styles.viewTxt2}>
            <IconFeather name="phone" size={18} color="#23AFDB" />
            <Text style={styles.txt2}>(11) 4004-6666</Text>
        </View>
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    container:{
        height: '100%', 
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    viewProblemasPedido:{
        marginTop: '5%',
        marginBottom: '5%'
    },

    txtProblemasPedido:{
        color: 'rgba(70,70,70,0.9)',
        fontSize: 18
    },

    viewTxt1:{
        width: '60%',
        alignItems: 'center',
        marginBottom: '5%'
    },

    viewTxt2:{
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%'
    },

    txt1:{
        textAlign: 'center',
        color: 'gray',
        fontSize: 16
    },

    txt2:{
        color: 'gray',
        fontSize: 16,
        marginLeft: 7
    },

    logoImg:{
        width: 110,
        height: 110
    }
})