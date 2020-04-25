import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, AsyncStorage} from 'react-native';
import Header from '../componentes/Header';
import Brendon from '../../assets/imgs/brendon.jpg'
import { TouchableHighlight, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PagamentoPerfil({navigation}){
    function navigateToCadastrarCartao(){
        navigation.navigate('Cartao');
    }

    return(
        <>
        <Header text="Pagamento"/>
        <View style={{backgroundColor: "white", height: "100%"}}>
            <View style={styles.opcoes}>
                <View style={styles.bt}> 
                    <TouchableOpacity onPress={navigateToCadastrarCartao}  style={styles.touch}>
                        <Icon name='credit-card' color='rgba(0,0,0,0.7)' size={25}/>
                        <View style={styles.btView}>
                            <Text style={styles.btTxt}>Cartão</Text>
                        </View>
                        <Icon name='add' size={27} color='#23AFDB' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    opcoes:{
        marginTop: '7%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    
    bt:{
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        width: '85%',
        height: 50, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    touch:{
        width: '100%', 
        height:50, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    btView:{
        width: '80%'
    },

    btTxt:{
        fontSize: 16, 
        paddingRight: '45%', 
        paddingLeft: '10%',
        color: 'gray'
    }
});