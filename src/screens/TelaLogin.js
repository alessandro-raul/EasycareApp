import React, { useState} from "react"
import {StyleSheet, View, FlatList, ScrollView, Alert, Text, Image, Dimensions, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, StatusBar, SafeAreaView, ScrollViewBase, TextInput, ImageBackground, KeyboardAvoidingView, Button} from 'react-native';
import HeaderLogin from '../componentes/HeaderLogin';
import Logo from '../../assets/imgs/icon2.png';
import InputComIcom from '../componentes/inputComIcon';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function TelaLogin({navigation}){

    const [stageNew, setStageNew] = useState([false]);
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState(['']);
    const [idCliente, setIdCliente] = useState(['']);

    var resposta= "";

        const data = {
            nomeCliente: nomeCliente,
            cpfCliente: cpfCliente
        }

        function navigateToHome(){
            navigation.navigate('Home');
        }
    
        function navigateToCad2(){
            navigation.navigate('Cadastro');
        }

        function stageFunction(){
            setStageNew(!stageNew);
        }

        async function Cadastrar(){
            try{
                const response = await api.post('/User/', data);
                resposta = response.data.response;
                console.log(resposta);
                salvarDados();
              
            }catch(error) {
                console.log(error);
                alert(error) 
            }
        }

        async function salvarDados(){
            try {
                await AsyncStorage.setItem("nomeCliente", nomeCliente);
                await AsyncStorage.setItem("CPF", cpfCliente);
                navigateToCad2();

            }catch(error) {
                console.log(error);
            }
        }

        async function Logar(){
            alert(`${idCliente}`);
        }

        return(
            <View style={{height: '100%', backgroundColor: '#fff', justifyContent:'center'}}>
                <StatusBar barStyle="dark-content"/>
                <HeaderLogin />
                    <KeyboardAvoidingView style={styles.fundo}>
                        <Image source={Logo} style={styles.logo}/>
                        <Text style={styles.txtLoginTop}>
                            {stageNew ? 'Login' : 'Criar conta'}
                        </Text>
                        <Text style={styles.txtInsira}>
                        {stageNew ? 'Insira seus dados' : 'Informe seus dados pessoais'}
                           
                        </Text>
                    
                        <View style = {styles.formContainer}>
                            {stageNew &&
                            <>
                                <InputComIcom placeholder = "Email" icon='email'  onChangeText={emailCliente => setEmailCliente(emailCliente)} /> 
                                <InputComIcom placeholder = "Senha" icon='lock' onChangeText={senhaCliente => setSenhaCliente(senhaCliente)} secureTextEntry={true} />
                            </>
                            }

                            {!stageNew &&
                            <>
                            <InputComIcom placeholder = "Nome" icon='person-pin' onChangeText={nomeCliente=>setNomeCliente(nomeCliente)} />
                            <InputComIcom placeholder = "CPF" keyboardType='numeric' icon='assignment-ind' onChangeText={cpfCliente=>setCpfCliente(cpfCliente)}/>
                            </>
                            }
                            

                            <View style={styles.bt}>
                                <TouchableNativeFeedback onPress={stageNew ? Logar : Cadastrar}>                           
                                    <View style={styles.btLogar}>
                                        <Text style={styles.txtLogin}> {stageNew ? 'Logar' : 'Prosseguir'} </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <TouchableOpacity style={styles.bt2} onPress={stageFunction}>
                                       <Text style={styles.txtCadastro}> {stageNew ? 'Não possui cadastro?' : 'Já possui cadastro?'} </Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                
            </View>
        )
    }

const styles = StyleSheet.create({


    fundo:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'

    },

    text:{
        fontSize: 60,
        color: '#3980ac',
        fontFamily: 'CaviarDreams'
    },

    txtLoginTop:{
        marginTop: '3%',
        fontSize: 30,
        color: '#23AFDB',
        fontFamily: 'CaviarDreams',
        //fontWeight: 'bold'
    },

    txtInsira:{
        marginTop: 10,
        fontFamily: 'CaviarDreams',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },

    logo:{
        width: 130,
        height: 130,
    },

    formContainer:{
        backgroundColor: 'white',
        width: '85%',
        marginBottom: 10
    },
    
    bt2:{
        marginTop: 30,
        alignItems: 'center',
    },

    bt:{
        marginTop: 40,
        alignItems: 'center',
    },


    btLogar:{
        justifyContent: 'center',
        backgroundColor: '#23AFDB',
        height: 48,
        width: 240,
        borderRadius: 50
    },

    txtLogin:{
        fontFamily: 'arial',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },

    txtCadastro:{
        color: '#707070',
        fontSize: 17,
        //marginBottom: 50
       
    },    
});