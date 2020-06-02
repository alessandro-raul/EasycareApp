import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import Header from '../componentes/Header';
import Brendon from '../../assets/imgs/brendon.jpg'
import { ScrollView, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight, ActivityIndicator } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import gifTriste from '../../assets/imgs/gifTriste.gif';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

export default function TelaPerfil({navigation}){

    const [nomeCliente, setNomeCliente] = useState(''); 
    const [statusLogin, setStatusLogin] = useState(0);
    const [showLoader, setShowLoader] = useState(true);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            pegarStatus();
            pegarNome();
        });
        return unsubscribe;
    }, [navigation]);
  
    async function pegarStatus(){
        try {
            const status = await AsyncStorage.getItem('statusLogin');
            if(status== "completo"){
                setStatusLogin(1);
            }else{
                setStatusLogin(2);
            }
        } catch (error) {
            
        }
    }

    async function pegarNome(){
        try {
            const nome = await AsyncStorage.getItem("nomeCliente");
            setNomeCliente(nome);
        } catch (error) {
            console.log(error);
        }
    }

    async function pegarEndereco(){
        const endereco = await AsyncStorage.getItem("logCliente");
        const numLog = await AsyncStorage.getItem("numLogCliente");
        console.log(endereco, numLog);
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

    async function navigateToPreLog(){
        try{
            await AsyncStorage.clear();
            const status = "1";
            await AsyncStorage.setItem("statusIntro", status);
            navigation.navigate('PreLog');
        }catch(error){
            console.log(error)
        }
    }
       
    function logOut(){
        Alert.alert(
            "Easycare",
            "Tem certeza que deseja sair?",
            [
              { text: "Sim", onPress: () => navigateToPreLog() }
            ],
            { cancelable: false });
    }

    return(
        <View style={{backgroundColor:"white", height: '100%'}}>
            <Header text="Perfil"/>
            {statusLogin==0 &&
            <View style={styles.container2}>
            </View>
            }

           {statusLogin==1 &&
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
                            <IconFeather name='map-pin' color='rgba(0,0,0,0.7)' size={22}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Endereços</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' />
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToPagamentoPerfil} style={styles.touch}>
                            <IconFeather name='credit-card' color='rgba(0,0,0,0.7)' size={22}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Pagamento</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToCupom} style={styles.touch}>
                            <IconComunity name='cards-outline' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Cupons</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bt}> 
                        <TouchableOpacity style={styles.touch} onPress={navigateToNotificacoes}>
                            <IconFeather name='bell' color='rgba(0,0,0,0.7)' size={22}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Notificações</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={pegarEndereco} style={styles.touch}>
                            <IconFeather name='help-circle' color='rgba(0,0,0,0.7)' size={22}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Ajuda</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={logOut} style={styles.touch}>
                            <IconFeather name='power' color='rgba(0,0,0,0.7)' size={22}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Sair</Text>
                            </View>
                            <IconFeather name='log-out' size={24} color='#23AFDB'  />
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            }

            {statusLogin==2 &&
                <View style={styles.container2}>
                    <Text style={styles.nlTxt}>Você ainda não se logou...</Text>
                    <Image source={gifTriste} style={styles.gif}/>
                        <TouchableOpacity style={styles.btLogar} onPress={navigateToPreLog}>
                            <Text style={styles.txtLogar}>Logar agora!</Text>
                        </TouchableOpacity>
                    </View>
            }
    </View>
    )
}

const styles = StyleSheet.create({
    container2:{
        height: '100%', 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center'
    },

    nlTxt:{
        fontSize: 22, color: '#666', 
        textAlign: 'center', 
        fontWeight: 'bold'
    },

    btLogar:{
        backgroundColor: '#23AFDB', 
        width: 155, 
        height: 40, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    txtLogar:{
        color: '#fff', 
        fontSize: 17, 
        fontWeight: 'bold'
    },
    
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
        width: '85%', 
        height: 57, 
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    btLogout:{
        marginBottom: "5%",
        width: '89%', 
        height: 57, 
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    touch:{
        borderColor: "rgba(70,70,70,0.4)", 
        width: '100%', 
        height: 57, 
        borderWidth: 1,
        borderRadius: 8,  
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
    },

    gif:{
        width: 150,
        height: 150
    }
})