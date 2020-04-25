import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Header from '../componentes/Header'
import Input from '../componentes/inputBasico'


export default function CadatrarCartao(){
    return(
        <>
        <Header text="Adicionar Cartão"/>
            <View style={{backgroundColor:"white", height: '100%', alignItems: 'center'}}>
            <View style={styles.mcView}>
                <Text style={styles.txt}>Preencha os dados abaixo</Text>
            </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Número do cartão"></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "35%", marginRight: "10%"}}>
                        <Input placeholder="Validade"></Input>
                    </View>
                    <View style={{width: "35%"}}>
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
                        <Text style={styles.txtAdd}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mcView:{
        width:'60%',
        marginTop: 25
    },
    
    txt:{
        fontSize: 18,
        color: 'rgba(0,0,0,0.60)',
        textAlign: 'center'
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