import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Header from '../componentes/Header'
import Input from '../componentes/inputBasico'


export default function CadatrarCartao(){
    return(
        <>
            <Header text="Adicionar Cupom"/>
            <View style={styles.fundo}>
                <View style={styles.mcView}>
                    <Text style={styles.txt}>Insira o cupom abaixo</Text>
                </View>
                <View style={styles.inputView}>
                    <Input placeholder="Código do cupom"></Input>
                </View>

                <View style={styles.btAddView}>
                    <TouchableOpacity style={styles.btAdd} >
                        <Text style={styles.txtAdd}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    fundo:{
        backgroundColor:"white", 
        height: '100%', 
        alignItems: 'center'
    },

    mcView:{
        width:'60%',
        marginTop: 25
    },
    
    txt:{
        fontSize: 17,
        color: 'rgba(0,0,0,0.60)',
        textAlign: 'center'
    },

    inputView:{
        width: '75%'
    },

    btAddView:{
        marginTop: '7%'
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