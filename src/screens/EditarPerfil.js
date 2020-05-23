import React , {useState, useEffect} from 'react';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Feather';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar, Text, View, StyleSheet, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import Brendon from '../../assets/imgs/brendon.jpg';
import Input from '../componentes/InputComIconQuad';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function EditarPerfil({navigation}){
    useEffect(() => {
        pegarDados();
    }, []);

    const [idCliente, setIdCliente] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [senhaCliente, setSenhaCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    var idLoginCliente;
    var idFoneCliente;

    const [showLoader, setShowLoader] = useState(false);
    
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
            setShowLoader(false);
            alert(error);
        }
    }

    async function atualizarUsuario(){
        try{ 
            setShowLoader(true);
            const data = {
                nomeCliente: nomeCliente,
                cpfCliente: cpfCliente
            }
            await api.put('/User/?idCliente=', data, { params: {idCliente} });
            pegarIdLogin();
        } catch (error){
            setShowLoader(false);
            alert(error);
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
            setShowLoader(false);
            alert(error);
        }
    }

    async function salvarIdLogin(){
        try {
           await AsyncStorage.setItem("idLoginCliente", idLoginCliente); 
           atualizarLoginUsuario();
        } catch (error) {
            setShowLoader(false);
            alert(error);
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
            setShowLoader(false);
            alert(error);
        }
    }

    async function pegarIdTelefone(){
        try {
            const response = await api.get('/UserPhone/', {params: {idCliente} });
            const data = response.data.response;

            data.map( item => {
                idFoneCliente = (item.idFoneCliente);
            });     
            atualizarTelefone();
        } catch (error) {
            setShowLoader(false);
            alert(error);
        }
    }

    async function atualizarTelefone(){
        const data = {
            numFoneCliente: telefoneCliente
        }
        try{
            await api.put('/UserPhone/', data, {params: {idFoneCliente} });
            atualizarDados();
        }catch (error){
            setShowLoader(false);
            alert(error);
        }
    }

    async function atualizarDados(){
        try{
            await AsyncStorage.setItem("nomeCliente", nomeCliente);
            await AsyncStorage.setItem("CPF", cpfCliente);
            await AsyncStorage.setItem("emailCliente", emailCliente);
            await AsyncStorage.setItem("senhaCliente", senhaCliente);
            await AsyncStorage.setItem("telefoneCliente", telefoneCliente);
            setShowLoader(false);
            Alert.alert(
                "Easycare",
                "Perfil atualizado com sucesso!",
                [
                  { text: "OK", onPress: () => voltar() }
                ],
                { cancelable: false });
        }catch(error){
            console.log(error)
        }
    }
    
    function voltar(){
        navigation.goBack();
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
                    <View style={{width:'100%', height:'20%',}}>
                        <TouchableOpacity style={styles.imgPerfilTouch}>
                            <Icons name='camera' size={20} color="white" style={{padding: 6}}></Icons>
                        </TouchableOpacity> 
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Input placeholder = "Nome" icon='user' onChangeText={nomeCliente => setNomeCliente(nomeCliente)} value={nomeCliente}></Input>
                    </View>
                    <View style={styles.input}>
                        <Input placeholder = "CPF" icon='clipboard' onChangeText={cpfCliente => setCpfCliente(cpfCliente)} value={cpfCliente}></Input>
                    </View>
                    <View style={styles.input}>
                        <Input placeholder = "Telefone" icon='smartphone' onChangeText={telefoneCliente=> setTelefoneCliente(telefoneCliente)} value={telefoneCliente}></Input>
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
                            {!showLoader &&
                                <Text style={styles.txtLogin}>Salvar</Text>
                            }

                            {showLoader &&
                                <ActivityIndicator animating={showLoader} size="small" color="white" />
                            }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    fundo:{
        backgroundColor: 'white'
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