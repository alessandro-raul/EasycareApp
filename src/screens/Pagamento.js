import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Header from '../componentes/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';


export default function Pagamento({navigation}){
    const cartaoTxt = 'Cartão';
    const dinheiroTxt = 'Dinheiro';


    function navigateToPedido(formaDePagamento){
        navigation.navigate('Pedido', {formaDePagamento});
    }

   


    return(
        <>
        <Header text="Pagamento"/>
        <View style={{backgroundColor: "white", height: "100%"}}>
            <View style={styles.opcoes}>
                    <Text style={styles.txt}>Escolha uma das formas de pagamento abaixo:</Text>
                    <TouchableOpacity onPress={()=>navigateToPedido(cartaoTxt)} style={styles.touch}>
                        <IconFeather name='credit-card' color='rgba(0,0,0,0.7)' size={24}/>
                        <View style={styles.btView}>
                            <Text style={styles.btTxt}>Cartão</Text>
                        </View>
                    </TouchableOpacity>
                   
               
                    <TouchableOpacity onPress={()=>navigateToPedido(dinheiroTxt)} style={styles.touch}>
                        <IconComunity name='cash-usd' color='rgba(0,0,0,0.7)' size={27}/>
                        <View style={styles.btView}>
                            <Text style={styles.btTxt}>Dinheiro</Text>
                        </View>
                      
                    </TouchableOpacity>
                
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

    bt2:{
        borderWidth: 1, 
        marginTop: 15,
        borderColor: "rgba(70,70,70,0.4)", 
        width: '85%',
        height: 50, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    touch:{
        width: '90%', 
        marginTop: 15,
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        height: 50, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    btView:{
        width: '80%'
    },

    btTxt:{
        fontSize: 16, 
        paddingRight: '45%', 
        paddingLeft: '10%',
        color: 'gray'
    },

    txt:{
        width: '50%',
        marginBottom: 5,
        fontSize: 16,
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'center'
    },
});