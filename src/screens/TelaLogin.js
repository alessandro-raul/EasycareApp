import React, { useState} from "react"
import {StyleSheet, View, FlatList, ScrollView, Alert, Text, Image, Dimensions, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback, StatusBar, SafeAreaView, ScrollViewBase, TextInput, ImageBackground, KeyboardAvoidingView, Button} from 'react-native';
import HeaderLogin from '../componentes/HeaderLogin';
import Logo from '../../assets/imgs/icon2.png';
import InputComIcom from '../componentes/inputComIcon';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Feather';


export default function TelaLogin({navigation}){

    const [stageNew, setStageNew] = useState([false]);
    const [emailCliente, setEmailCliente] = useState('');
    const [senhaCliente, setSenhaCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState();
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState();
    const [idCliente, setIdCliente] = useState();
    var valida = 0;
    var idClientee;
    var cpfClientee;
    var foneClientee;
    var nomeClientee;

    var resposta= "";

        const data = {
            nomeCliente: nomeCliente,
            cpfCliente: cpfCliente
        }

        function navigateToHome(){
            navigation.navigate('Home', {screen: 'Home'});
        }
    
        function navigateToCad2(){
            navigation.navigate('Cadastro');
        }

        function stageFunction(){
            setStageNew(!stageNew);
        }

        function validaCPF(strCPF) {
            if(strCPF.length != 0 && strCPF.length === 11){
                var cpf = strCPF;
                digitoA = 0;
                digitoB = 0;
    
                for (let i = 0, x = 10; i <= 8; i++, x--) {
                    digitoA += cpf[i] * x;          
                }
    
                for (let i = 0, x = 11; i <= 9; i++, x--) {
    
                    
                    if(String(i).repeat(11) == cpf){                   
                        return false;
                        break;
                    }
                    
    
                    digitoB += cpf[i] * x;          
                }
    
                somaA = ((digitoA%11) < 2) ? 0 : 11-(digitoA%11);
                somaB = ((digitoB%11) < 2) ? 0 : 11-(digitoB%11);
    
                if(somaA != cpf[9] || somaB != cpf[10]) {
                    return false;
                }else {
                    return true;
                }
            }else {
                return false;
            }

        }

        async function Cadastrar(cpf){
            if(validaCPF(cpf) && nomeCliente.length >= 8 && nomeCliente.search(" ") != -1 && (telefoneCliente.length === 11)){
                //console.log('CPF VALIDO!');
                try{
                    const response = await api.post('/User/', data);
                    resposta = response.data.response;
                    console.log(resposta);
                    salvarDados();
                }catch(error) {
                    console.log(error);
                    alert(error) 
                }
            }else{
                alert(`${nomeCliente.length >= 8 && nomeCliente.search(" ") != -1 ? '' : 'Nome inválido, insira nome e sobrenome, Ex: Maria Silva.'} 
${validaCPF(cpf).valueOf() ? '' : 'CPF inválido, insira um CPF sem pontuções, Ex: 12345678912'}`);
                //console.log(nomeCliente.length);
                //console.log(validaCPF(cpf).valueOf() ? 'valido' : 'invalido');
            }
            /*
            try{
                const response = await api.post('/User/', data);
                resposta = response.data.response;
                console.log(resposta);
                salvarDados();
            }catch(error) {
                console.log(error);
                alert(error) 
            }
            */
        }

        async function salvarDados(){
            try {
                await AsyncStorage.setItem("emailCliente", emailCliente);
                await AsyncStorage.setItem("senhaCliente", senhaCliente);
                await AsyncStorage.setItem("nomeCliente", nomeCliente);
                await AsyncStorage.setItem("CPF", cpfCliente);
                navigateToCad2();
            }catch(error) {
                console.log(error);
            }
        }

        function validaEmail(email){
            usuario = email.substring(0, email.indexOf('@'));
            dominio = email.substring(email.indexOf('@')+1, email.length)
    
            if ((usuario.length >=1) &&
                (dominio.length >=3) && 
                (usuario.search("@")==-1) && 
                (dominio.search("@")==-1) &&
                (usuario.search(" ")==-1) && 
                (dominio.search(" ")==-1) &&
                (dominio.search(".")!=-1) &&      
                (dominio.indexOf(".") >=1)&& 
                (dominio.lastIndexOf(".") < dominio.length - 1)) 
            {
                return true;
                //console.log("E-mail válido");
            }else{
                //console.log('E-mail inválido');
                return false;
            }
            //console.log(usuario+'@'+dominio);
        }

        function validaSenha(senha){
            if( (senha.length != 0) &&
                (senha.length >= 8) &&
                (senha.search(" ") == -1))
            {   
                //console.log(senha+' valida');
                return true;
            }else{
                //console.log(senha+' Invalida');
                return false;
            }
        }
        
        async function Logar(){
            if(validaEmail(emailCliente) && validaSenha(senhaCliente)){

                try{
                    const response = await api.get('/UserLogin/', {params:{emailCliente: emailCliente, senhaCliente: senhaCliente}});
                    const data = response.data.response;
                    
                    if(data != undefined){
                     data.map(item => {
                         valida = item.idLoginCliente,
                         idClientee = item.idCliente
                     });
                    }
                     if(valida != 0){
                         pegarDadosCliente();
                     }else{
                         Alert.alert(
                             "Easycare",
                             "Email ou senha inválidos!",
                             [
                               { text: "OK"}
                             ],
                             { cancelable: false });
                     }
                 }catch(error){
                     console.log(error);
                 }

            }else{
                alert('Não foi possivel logar, verifique se os dados estão corretos');
            }

            /*
            try{
               const response = await api.get('/UserLogin/', {params:{emailCliente: emailCliente, senhaCliente: senhaCliente}});
               const data = response.data.response;
               
               if(data != undefined){
                data.map(item => {
                    valida = item.idLoginCliente,
                    idClientee = item.idCliente
                });
               }
                if(valida != 0){
                    pegarDadosCliente();
                }else{
                    Alert.alert(
                        "Easycare",
                        "Email ou senha inválidos!",
                        [
                          { text: "OK"}
                        ],
                        { cancelable: false });
                }
            }catch(error){
                console.log(error);
            }
            */
           
        }

        async function pegarDadosCliente(){
            try{
            const response = await api.get('/User/', {params:{idCliente: idClientee}});
            const responseFone = await api.get('/UserPhone/', {params:{idCliente: idClientee}});
            const data = response.data.response;
            const dataFone = responseFone.data.response;
        
            data.map(item => {
                nomeClientee = item.nomeCliente,
                cpfClientee = item.cpfCliente
            })

            dataFone.map(item => {
                foneClientee = item.numFoneCliente
            })
            salvarDados2();
            }catch(error){
                console.log(error)
            }
        }

        async function salvarDados2(){
            try {
                await AsyncStorage.setItem("emailCliente", emailCliente);
                await AsyncStorage.setItem("senhaCliente", senhaCliente);
                await AsyncStorage.setItem("nomeCliente", nomeClientee);
                await AsyncStorage.setItem("CPF", cpfClientee);
                await AsyncStorage.setItem("idCliente", idClientee);
                await AsyncStorage.setItem("telefoneCliente", foneClientee);
                await AsyncStorage.setItem("statusLogin", "completo");
                navigateToHome();
            }catch(error) {
                console.log(error);
            }
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
                                <View style={styles.inputContainer}>
                                    <TouchableWithoutFeedback>
                                        <Icon style={styles.icon} name="mail" size={20} color="#666" />
                                    </TouchableWithoutFeedback>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder = "Email" 
                                        returnKeyType="next" 
                                        autoCapitalize="none"
                                        keyboardType="email-address" 
                                        blurOnSubmit={false} 
                                        onChangeText={emailCliente => setEmailCliente(emailCliente)} 
                                        onSubmitEditing={() => this.input2.focus()}
                                    /> 
                                </View>
                                <View style={styles.inputContainer}>
                                    <TouchableWithoutFeedback>
                                        <Icon style={styles.icon} name="lock" size={20} color="#666" />
                                    </TouchableWithoutFeedback>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder = "Senha" 
                                        returnKeyType="go" 
                                        autoCapitalize="none"
                                        blurOnSubmit={false} 
                                        onChangeText={senhaCliente => setSenhaCliente(senhaCliente)} 
                                        secureTextEntry={true} 
                                        ref={(input) => {this.input2 = input;}}
                                        onSubmitEditing={stageNew ? Logar : Cadastrar}                            
                                    />
                                </View>    
                            </>
                            }

                            {!stageNew &&
                            <>
                            <View style={styles.inputContainer}>
                                <TouchableWithoutFeedback>
                                    <Icon style={styles.icon} name="lock" size={20} color="#666" />
                                </TouchableWithoutFeedback>
                            <TextInput 
                                style={styles.input}
                                placeholder = "Nome" 
                                icon='user'
                                returnKeyType="next" 
                                autoCapitalize="words"
                                //keyboardType="default"
                                blurOnSubmit={false}
                                onChangeText={nomeCliente=>setNomeCliente(nomeCliente)}
                                onSubmitEditing={() => this.input3.focus()}
                            />
                            </View>
                            <View style={styles.inputContainer}>
                                <TouchableWithoutFeedback>
                                    <Icon style={styles.icon} name="lock" size={20} color="#666" />
                                </TouchableWithoutFeedback>
                                <TextInput 
                                    style={styles.input}
                                    placeholder = "CPF" 
                                    keyboardType='numeric'
                                    returnKeyType="go" 
                                    icon='clipboard' 
                                    onChangeText={cpfCliente=>setCpfCliente(cpfCliente)}
                                    ref={(input) => {this.input3 = input;}}
                                    onSubmitEditing={() => stageNew ? Logar : Cadastrar(cpfCliente)}
                                />
                            </View>
                            </>
                            }

                            <View style={styles.bt}>
                                <TouchableNativeFeedback onPress={() => stageNew ? Logar : Cadastrar(cpfCliente)}>                           
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

    inputContainer: {
        borderColor: 'rgba(70,70,70, 0.31)',
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 20,
        marginTop: 25,
        flexDirection: 'row'
      },
    
      icon: {
        alignSelf: 'center',
        paddingRight: 20,
        marginLeft: 10,
        color: 'rgba(0,0,0,0.7)'
      },
    
      input: {
        fontSize: 16,
        color: '#666',
        flex: 1
      }
      
});