import React, {useState} from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView,TouchableOpacity, TouchableNativeFeedback,TouchableWithoutFeedback, Image, TextInput} from 'react-native'
import HeaderLogin from '../componentes/HeaderLogin';
import Logo from '../../assets/imgs/icon2.png';
import InputComIcom from '../componentes/inputComIcon';
import { ScrollView } from 'react-native-gesture-handler';
import TelaLogin from './TelaLogin';
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage';
import DashboardRoutes from '../../routes/dashboard.routes';

import Icon from 'react-native-vector-icons/Feather';

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

    function validaEmail(email){
        usuario = email.substring(0, email.indexOf('@'));
        dominio = email.substring(email.indexOf('@')+1, email.length)

        if ((String(usuario).length >=1) &&
            (String(dominio).length >=3) && 
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
        if( (String(senha).length != 0) &&
            (String(senha).length >= 8) &&
            (senha.search(" ") == -1))
        {   
            //console.log(senha+' valida');
            return true;
        }else{
            //console.log(senha+' Invalida');
            return false;
        }
    }

    async function cadastrarLoginCliente(){
        const data = {
            idCliente: idCliente,
            emailCliente: emailCliente,
            senhaCliente: senhaCliente
        }

        /*
        validaEmail(data.emailCliente);
        validaSenha(data.senhaCliente);
        */

        if(validaEmail(data.emailCliente) && validaSenha(data.senhaCliente) && String(telefoneCliente).length === 11){

            try {
                await api.post('/UserLogin/', data);
                cadastrarTelefone();
    
            } catch (error) {
                console.log(error);
                alert(error);
            }

        }else{
            alert(`${validaEmail(data.emailCliente) ? '' : 'Email inválido, verifique-o.'} 
${validaSenha(data.senhaCliente) ? '' : 'Senha inválida, utilize uma senha com no minímo 8 digitos, sem espaços em branco.'}
${String(telefoneCliente).length === 11 ? '' : 'Senha inválida, utilize uma senha com no minímo 8 digitos, sem espaços em branco.'}`);
        }
        
        /*
        try {
            await api.post('/UserLogin/', data);
            cadastrarTelefone();

        } catch (error) {
            console.log(error);
            alert(error);
        }
        */
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
            salvaStatusLogin();
        } catch (error) {
            alert(error);
        }
    }

    async function salvaStatusLogin(){
        try {
            await AsyncStorage.setItem("statusLogin", "completo");
            console.log('Completo');
            navigateToHome();
        } catch (error) {
            
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
                            returnKeyType="next"
                            autoCapitalize="none" 
                            blurOnSubmit={false} 
                            onChangeText={senhaCliente => setSenhaCliente(senhaCliente)} 
                            secureTextEntry={true}
                            ref={(input) => {this.input2 = input;}}
                            onSubmitEditing={() => this.input3.focus()}
                        />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <TouchableWithoutFeedback>
                            <Icon style={styles.icon} name="smartphone" size={20} color="#666" />
                        </TouchableWithoutFeedback>
                        <TextInput 
                            style={styles.input}
                            placeholder = "Telefone" 
                            keyboardType='numeric'
                            returnKeyType="go"
                            blurOnSubmit={true} 
                            onChangeText={telefoneCliente=> setTelefoneCliente(telefoneCliente)}
                            ref={(input) => {this.input3 = input;}}
                            onSubmitEditing={pegarCpf}
                        />
                    </View>
                </>
                <View style={styles.bt}>
                    <TouchableNativeFeedback onPress={pegarCpf}>                           
                        <View style={styles.btLogar}>
                            <Text style={styles.txtLogin}>Cadastrar</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {/*<TouchableOpacity style={styles.bt2} onPress={navigateToLogin}>
                    <Text style={styles.txtCadastro}>Voltar</Text>
                    </TouchableOpacity>*/}
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
    },
});
        
