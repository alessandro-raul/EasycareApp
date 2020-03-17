import React, { Component} from "react"
import {StyleSheet, ScrollView,View, Alert, Text, Image, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, StatusBar, SafeAreaView, ScrollViewBase, TextInput, ImageBackground} from 'react-native';
import HeaderLogin from '../componentes/HeaderLogin';
import Form from '../componentes/Form';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../assets/imgs/icon2.png';
import FootPular from "../componentes/FootPular";
import InputComIcom from '../componentes/inputComIcon'

export default class TelaLogin extends Component{
    alert=() =>{
        Alert.alert(this.state.name)
    }

    state = {
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    render(){
        return(
            <ScrollView style={{height: '100%'}}>
             <StatusBar backgroundColor="#277AB1" barStyle="light-content" />
                <HeaderLogin/>   
                <View style={styles.fundo}>
                <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.txtLoginTop}>
                        {this.state.stageNew ? 'Criar nova conta' : 'Login'}</Text>
                  

                    <View style = {styles.formContainer}>
                        {this.state.stageNew &&
                        <InputComIcom placeholder = "Nome" icon="user" onChangeText={name=> this.setState({name})}
                        />
                        }
                        {this.state.stageNew &&
                        <InputComIcom placeholder = "CPF" icon='address-card' onChangeText={cpf=>this.setState({cpf})} />
                        }
                        <InputComIcom placeholder = "Email" icon='envelope' onChangeText={email=>this.setState({email})} />
                        <InputComIcom placeholder = "Senha" icon='lock' secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
                        {this.state.stageNew &&
                        <InputComIcom placeholder = "Confirmar senha" icon='lock' style={styles.textInput} secureTextEntry={true} onChangeText={confirmPassword=>this.setState({confirmPassword})}/>
                        }
                        <View style={styles.bt}>
                            <TouchableNativeFeedback onPress = {()=> {this.alert()}}>
                                <View style={styles.btLogar}>
                                    <Text style={styles.txtLogin}>{this.state.stageNew ? 'Criar' : 'Logar'}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                            <TouchableOpacity style={styles.bt2} onPress={()=> this.setState({stageNew: !this.state.stageNew})}>
                                <Text style={styles.txtCadastro}>
                                    {this.state.stageNew ? 'Já possui cadastro?' : 'Não é cadastrado?'} 
                                </Text>
                            </TouchableOpacity>
                    </View>
                </View>
                <FootPular/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    fundo:{
        flex: 1,
        alignItems: 'center'
    },

    text:{
        fontSize: 60,
        color: '#3980ac',
        fontFamily: 'LobsterTwo'
    },

    txtLoginTop:{
        marginTop: '3%',
        fontSize: 42.5,
        color: '#277AB1',
        fontFamily: 'LobsterTwo',
        //fontWeight: 'bold'
    },

    logo:{
        marginTop: '7%',
        width: 140,
        height: 140,
    },

    formContainer:{
        flex:1,
        //backgroundColor: 'blue',
        width: '85%',
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
        backgroundColor: '#277AB1',
        height: 50,
        width: 250,
        borderRadius: 8
    },

    txtLogin:{
        fontFamily: 'arial',
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },

    txtCadastro:{
        color: '#277AB1',
        //fontWeight: 'bold',
        fontSize: 20,
    
    },

    txtPular: {
        fontSize: 17,
        color: 'gray',
        textDecorationLine: 'underline'
    },
    });
