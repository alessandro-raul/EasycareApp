import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../componentes/Header';
import IconFeather from 'react-native-vector-icons/Feather';
import Input from '../componentes/inputBasico';


export default function CadatrarCartao(){
    return(
        <>
        <Header text="Adicionar Cartão"/>
            <View style={{backgroundColor:"white", height: '100%', alignItems: 'center'}}>
            <View style={styles.mcView}>
                <IconFeather name='credit-card' size={20} color="rgba(0,0,0,0.75)"/>
                <Text style={styles.txt}>Preencha os dados abaixo</Text>
            </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Número do cartão"></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "37%", marginRight: "6%"}}>
                        <Input placeholder="Validade"></Input>
                    </View>
                    <View style={{width: "37%"}}>
                        <Input placeholder="CVV"></Input>
                    </View>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Nome do titular"></Input>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="CPF/CNPJ"></Input>
                </View>
                <View style={{marginTop: '7%'}}>
                    <TouchableOpacity style={styles.btAdd} >
                        <Text style={styles.txtAdd}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mcView:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width:'60%',
        marginTop: 25
    },
    
    
    txt:{
        fontSize: 18,
        color: 'rgba(0,0,0,0.60)',
        textAlign: 'center',
        marginLeft: '2%'
    },

    btAdd:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        height: 42,
        backgroundColor: '#23AFDB',
        borderRadius: 50
    },

    txtAdd:{
        textAlign:"center", 
        fontSize: 17, 
        color: 'white'
    }
})