import React, {useState} from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView,TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native'
import HeaderLogin from '../componentes/HeaderLogin';
import Logo from '../../assets/imgs/icon2.png';
import InputComIcom from '../componentes/inputComIcon';
import { ScrollView } from 'react-native-gesture-handler';
import TelaLogin from './TelaLogin';
import api from '../services/api'
import { AsyncStorage } from 'react-native';
import DashboardRoutes from '../../routes/dashboard.routes';

export default function Cadastro({navigation}){

    const [emailCliente, setEmailCliente] = useState('');
    const [senhaCliente, setSenhaCliente] = useState('');
    const [telefoneCliente, setTelefoneCliente] = useState('');
    var cpfCliente;
    var idCliente;
    
    function navigateToLogin(){
        navigation.navigate(TelaLogin);
    }

    function navigateToHome(){
        navigation.navigate('Home');
    }

    async function pegarCpf(){
        try {
            cpfCliente = await AsyncStorage.getItem("CPF");
            pegarId();
        } catch (error) {
            console.log(error);
        }
    }

    async function pegarId(){
        try{
            const response = await api.get('/User/', { params: {cpfCliente} });
            var data = response.data.response;
            
            data.map( item => {
                idCliente = (item.idCliente)
            });
            cadastrarLoginCliente();

        }catch(error){
            console.log(error);
        }
    }

    async function cadastrarLoginCliente(){
        const data = {
            idCliente: idCliente,
            emailCliente: emailCliente,
            senhaCliente: senhaCliente
        }

        try {
            await api.post('/UserLogin/', data);
            cadastrarTelefone();

        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    async function cadastrarTelefone(){
        const data = {
            idCliente: idCliente,
            numFoneCliente: telefoneCliente
        }

        try {
            console.log(data); 
            await api.post('/UserPhone/', data);
            salvarDados();
        } catch (error) {
            console.log(error);
        }
    }

    async function salvarDados(){
        try {
            await AsyncStorage.setItem("emailCliente", emailCliente);
            await AsyncStorage.setItem("senhaCliente", senhaCliente);
            await AsyncStorage.setItem("idCliente", idCliente);
            await AsyncStorage.setItem("telefoneCliente", telefoneCliente);
            navigateToHome();
        } catch (error) {
            alert(error);
        }
    }

    return(
    <View style={{height: '100%', backgroundColor: '#fff', justifyContent: 'center'}}>
        <HeaderLogin/>        
        <KeyboardAvoidingView style={styles.fundo}>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.txtLoginTop}>
               Finalizar cadastro
            </Text>
            <Text style={styles.txtInsira}>
                Falta pouco para você concluir!
            </Text>
        
            <View style = {styles.formContainer}>
                <>
                    <InputComIcom placeholder = "Email" icon='email'  onChangeText={emailCliente => setEmailCliente(emailCliente)} /> 
                    <InputComIcom placeholder = "Senha" icon='lock' onChangeText={senhaCliente => setSenhaCliente(senhaCliente)} secureTextEntry={true} />
                    <InputComIcom placeholder = "Telefone" keyboardType='numeric' icon='phone' onChangeText={telefoneCliente=> setTelefoneCliente(telefoneCliente)}/>
                </>
                <View style={styles.bt}>
                    <TouchableNativeFeedback onPress={pegarCpf}>                           
                        <View style={styles.btLogar}>
                            <Text style={styles.txtLogin}>Cadastrar</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <TouchableOpacity style={styles.bt2} onPress={navigateToLogin}>
                    <Text style={styles.txtCadastro}>Voltar</Text>
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
    },

    text:{
    fontSize: 60,
    color: '#3980ac',
    fontFamily: 'CaviarDreams'
    },

    txtLoginTop:{
    marginTop: '3%',
    fontSize: 26,
    color: '#23AFDB',
    fontFamily: 'CaviarDreams',
    },

    txtInsira:{
    marginTop: 10,
    fontFamily: 'CaviarDreams',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 10
    },

    logo:{
    width: 140,
    height: 140,
    },

    formContainer:{

    width: '85%'
    },

    bt:{
    marginTop: 40,
    alignItems: 'center',
    },

    bt2:{
    marginTop: 30,
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
    },    
});
        
