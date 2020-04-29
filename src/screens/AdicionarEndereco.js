import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '../componentes/inputBasico';


export default function AdicionarEndereco({navigation}){
    return(
        <>
        <Header text="Adicionar Endereço"/>
            <View style={{backgroundColor:"white", height: '100%', alignItems: 'center'}}>
            <View style={styles.mcView}>
                <Icon name='edit-location' size={22} color="rgba(0,0,0,0.75)"/>
                <Text style={styles.txt}>Preencha os dados abaixo</Text>
            </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Endereço"></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "35%", marginRight: "5%"}}>
                        <Input placeholder="Número"></Input>
                    </View>
                    <View style={{width: "40%"}}>
                        <Input placeholder="CEP"></Input>
                    </View>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Complemento"></Input>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Bairro"></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "50%", marginRight: "5%"}}>
                        <Input placeholder="Cidade"></Input>
                    </View>
                    <View style={{width: "25%"}}>
                        <Input placeholder="UF"></Input>
                    </View>
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