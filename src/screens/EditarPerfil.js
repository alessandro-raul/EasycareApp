import React , {useState, useEffect} from 'react';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, Text, View, StyleSheet, Image, AsyncStorage, Alert, ScrollView, Modal } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import Brendon from '../../assets/imgs/brendon.jpg';
import Input from '../componentes/inputComIcon';
import api from '../services/api';

export default function EditarPerfil({navigation}){
    
    useEffect(() => {
        pegarDados();
    }, []);

    const [idCliente, setIdCliente] = useState('');
    //const [idLoginCliente, setIdLoginCliente] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [senhaCliente, setSenhaCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    var idLoginCliente;

    async function pegarDados(){
        try {
          const id = await AsyncStorage.getItem("idCliente");
          const nome = await AsyncStorage.getItem("nomeCliente");
          const cpf = await AsyncStorage.getItem("CPF");
          const email = await AsyncStorage.getItem("emailCliente");
          const senha = await AsyncStorage.getItem("senhaCliente");
          const telefone = await AsyncStorage.getItem("telefoneCliente");

          setIdCliente(id);
          setNomeCliente(nome);
          setCpfCliente(cpf);
          setEmailCliente(email);
          setSenhaCliente(senha);
          setTelefoneCliente(telefone);
          
        } catch (error) {
            console.log(error);
        }
    }

    async function atualizarUsuario(){
        try{ 
            const data = {
                nomeCliente: nomeCliente,
                cpfCliente: cpfCliente
            }
            await api.put('/User/?idCliente=', data, { params: {idCliente} });
            pegarIdLogin();

        } catch (error){
            console.log(error);
        }
    }

    async function pegarIdLogin(){
        try {
            const response = await api.get('/UserLogin/', {params: {idCliente} });
            const data = response.data.response;

            data.map( item => {
                idLoginCliente = (item.idLoginCliente);
            });     
            salvarIdLogin();

        } catch (error) {
            console.log(error);
        }
    }

    async function salvarIdLogin(){
        try {
           await AsyncStorage.setItem("idLoginCliente", idLoginCliente); 
           atualizarLoginUsuario();

        } catch (error) {
            console.log(error);
        }
    }

    async function atualizarLoginUsuario(){
        try {
            const data = {
                emailCliente: emailCliente,
                senhaCliente: senhaCliente
            }
            await api.put('/UserLogin/', data, {params: {idLoginCliente} });
            pegarIdTelefone();

        } catch (error) {
            console.log(error);
        }
    }


    async function pegarIdTelefone(){
        try {
            const response = await api.get('/UserPhone/', {params: {idCliente} });
            const data = response.data.response;

            data.map( item => {
                idLoginCliente = (item.idLoginCliente);
            });     
            salvarIdLogin();

        } catch (error) {
            console.log(error);
        }

    }


    async function atualizarTelefone(){
        const data = {
            idCliente: idCliente,
            numFoneCliente: telefoneCliente
        }
        try{
            await api.put('/UserPhone/', data, {params: {idFoneCliente} });

        }catch (error){
            console.log(error);
        }
    }


    async function atualizarDados(){
        try{
            await AsyncStorage.setItem("nomeCliente", nomeCliente);
            await AsyncStorage.setItem("CPF", cpfCliente);
            await AsyncStorage.setItem("emailCliente", emailCliente);
            await AsyncStorage.setItem("senhaCliente", senhaCliente);
            Alert.alert(
                "Easycare",
                "Perfil atualizado com sucesso!",
                [
                  { text: "OK", onPress: () => voltar() }
                ],
                { cancelable: false }
              );

        }catch(error){
            console.log(error)
        }
    }
    
    function voltar(){
        navigation.goBack(null); 
    }

    return(
        <>
        <StatusBar backgroundColor="white" />
        <Header text="Editar Perfil" navigation= {navigation} />
        <ScrollView style={styles.fundo}>
            <View style={styles.banner}>
                <View style={{backgroundColor: '#23AFDB', width:'100%', height:'60%', alignItems:'center'}}>
                       <Image source={Brendon} style={styles.imgPerfil}/>
                </View>
                <View style={{width:'100%', height:'20%'}}>
                    <TouchableOpacity style={styles.imgPerfilTouch}>
                        <Icon name='photo-camera' size={23} color="white" style={{padding: 5}}></Icon>
                    </TouchableOpacity> 
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.input}>
                    <Input placeholder = "Nome" icon='person-pin' onChangeText={nomeCliente => setNomeCliente(nomeCliente)} value={nomeCliente}></Input>
                </View>
                <View style={styles.input}>
                    <Input placeholder = "CPF" icon='assignment-ind' onChangeText={cpfCliente => setCpfCliente(cpfCliente)} value={cpfCliente}></Input>
                </View>
                <View style={styles.input}>
                    <Input placeholder = "Telefone" icon='phone' onChangeText={telefoneCliente=> setTelefoneCliente(telefoneCliente)} value={telefoneCliente}></Input>
                </View>
                <View style={styles.input}>
                    <Input placeholder = "Email" icon='mail' onChangeText={emailCliente => setEmailCliente(emailCliente)} value={emailCliente}></Input>
                </View>
                <View style={styles.input}>
                    <Input placeholder = "Senha" icon='lock' onChangeText={senhaCliente => setSenhaCliente(senhaCliente)} value={senhaCliente}></Input>
                </View>
                <View style={styles.bt}>
                    <TouchableOpacity onPress={atualizarUsuario}>                           
                        <View style={styles.btLogar}>
                            <Text style={styles.txtLogin}>Salvar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </>
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

    imgPerfilTouch:{
        alignContent: 'center',
        marginLeft: '55%',
        marginTop: '5%',
        width: 33,
        height: 33,
        borderRadius: 30,
        backgroundColor: '#23AFDB'
    },
    
    form:{
        justifyContent: 'center',
        alignItems: 'center'
    },

    input:{
        width: '85%', 
    },

    bt:{
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 20
    },

    txtLogin:{
        fontFamily: 'arial',
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    },

    btLogar:{
        justifyContent: 'center',
        backgroundColor: '#23AFDB',
        height: 42,
        width: 190,
        borderRadius: 50,      
    },
})