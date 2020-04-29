import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import Header from '../componentes/Header';
import Brendon from '../../assets/imgs/brendon.jpg'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

export default function TelaPerfil({navigation, parametro}){

    const [nomeCliente, setNomeCliente] = useState(''); 

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                pegarNome();
        });
        return unsubscribe;
    }, [navigation]);
  


    async function pegarNome(){
        try {
            const nome = await AsyncStorage.getItem("nomeCliente");
            setNomeCliente(nome);
        } catch (error) {
            console.log(error);
        }
    }

    function navigateToPagamentoPerfil(){
        navigation.navigate('PagamentoPerfil');
    }
    
    function navigateToIntroducao(){
        navigation.navigate('Introducao');
    }

    function navigateToEditarPerfil(){
        navigation.navigate('EditarPerfil');
    }

    function navigateToCupom(){
        navigation.navigate('Cupom');
    }

    function navigateToNotificacoes(){
        navigation.navigate('Notificacoes');
    }

    function navigateToEnderecos(){
        navigation.navigate('Enderecos');
    }

    return(
        <View style={{backgroundColor:"white", height: '100%'}}>
            <Header text="Perfil"/>
            <ScrollView style={styles.fundo}>
                <View style={styles.banner}>
                    <View style={{backgroundColor: '#23AFDB', width:'100%', height:'60%', alignItems:'center'}}>
                        <Image source={Brendon} style={styles.imgPerfil}/>
                    </View>
                    <View style={{width:'100%', height:'20%'}}>
                    </View>
                </View>

                <View style={styles.infos}>
                    <View style={styles.nomeCliente}>
                        <Text style={styles.nomeClienteTxt}>{nomeCliente}</Text>
                    </View>
                    <View style={{marginTop: '3%'}}>
                        <TouchableOpacity style={styles.btEditar} onPress={navigateToEditarPerfil}>
                            <Text style={styles.txtEditar}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.opcoes}>
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToEnderecos} style={styles.touch}>
                            <Icon name='place' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Endereços</Text>
                            </View>
                            <Icon name='arrow-forward' size={27} color='#23AFDB' />
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToPagamentoPerfil} style={styles.touch}>
                            <Icon name='payment' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Pagamento</Text>
                            </View>
                            <Icon name='arrow-forward' size={27} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToCupom} style={styles.touch}>
                            <IconAwesome name='ticket' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Cupons</Text>
                            </View>
                            <Icon name='arrow-forward' size={27} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bt}> 
                        <TouchableOpacity style={styles.touch} onPress={navigateToNotificacoes}>
                            <Icon name='notifications-none' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Notificações</Text>
                            </View>
                            <Icon name='arrow-forward' size={27} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bt}> 
                        <TouchableOpacity style={styles.touch}>
                            <Icon name='help' color='rgba(0,0,0,0.7)' size={27}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Ajuda</Text>
                            </View>
                            <Icon name='arrow-forward' size={27} color='#23AFDB'  />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    banner:{
        alignItems: 'center',
        height: 170,
    },

    imgPerfil:{
        borderRadius: 70,
        marginTop: 40,
        height: 120,
        width: 120
    },

    infos:{
        justifyContent: 'center',
        alignItems: 'center'
    },

    nomeCliente:{
        width: '80%',
     },

    nomeClienteTxt:{
        fontSize: 24,
        textAlign: 'center',
        color:'rgba(0,0,0,0.7)'
    },

    btEditar:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        height: 42,
        backgroundColor: '#23AFDB',
        borderRadius: 50
    },

    txtEditar:{
        textAlign:"center", 
        fontSize: 17, 
        color: 'white'
    },

    opcoes:{
        marginTop: '7%',
        width: '100%',
        alignItems: 'center',
    }, 
    
    bt:{
        marginBottom: "5%",
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        width: '85%', 
        height: 60, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    touch:{
        width: '100%', 
        height:65, 
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
        paddingLeft: '5%',
        color: 'gray'
    }
})