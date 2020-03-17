import React, { Component} from "react"
import {StyleSheet, ScrollView, View, Text, Image, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, StatusBar, SafeAreaView, ScrollViewBase, ImageBackground} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../assets/imgs/icon2.png';
import fundo from '../../assets/imgs/fundo5.jpg';





class Form extends Component {  
    render(){
        return(
            <View>
                <Text style={styles.txtLoginTop}>Login</Text>
                <Image source={Logo} style={styles.logo}/>
                <View style = {styles.input}>
                    <Input
                        placeholder = "Email"
                        leftIcon= {
                            <Icon name='user' 
                            color ='#3980ac'
                            size = {24}/>
                        }
                    />
                
                    <Input 
                        placeholder = "Senha"
                        leftIcon= {
                            <Icon name='lock'
                            color ='#3980ac'
                            size = {24}
                            />
                        }
                    />
                </View>
                
                <TouchableNativeFeedback onPress = {()=> {this.alert()}}>
                    <View style={styles.btLogar}>
                        <Text style={styles.txtLogin}>LOGIN</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableOpacity>
                        <Text style={styles.txtCadastro}>Cadastre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.txtPular}>Pular</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

    const styles = StyleSheet.create({
    fundo:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white"
    },

    text:{
    fontSize: 60,
    color: '#3980ac',
    fontFamily: 'LobsterTwo'
    },

    txtLoginTop:{
    fontSize: 35,
    fontFamily: 'LobsterTwo'

    },

    logo:{
    width: 100,
    height: 100,

    },

    input:{
    justifyContent: 'space-around',
    width: '85%',
    height: '22%',

    },

    btLogar:{
    //justifyContent: 'space-around',
    marginTop: '5%',
    alignItems: 'center',
    backgroundColor: '#3980ac',
    height: 40,
    width: 300,
    borderRadius: 50
    },

    txtLogin:{
    paddingTop: 7,
    fontFamily: 'arial',
    color: 'white',
    fontSize: 20
    },

    txtCadastro:{
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 22
    },

    txtPular: {
    fontSize: 17,
    color: 'gray',
    textDecorationLine: 'underline'
    },
    });

export default Form;