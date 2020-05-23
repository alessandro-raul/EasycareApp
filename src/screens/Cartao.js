import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';

export default function Cartao({navigation}){

    function navigateToCadastrarCartao(){
        navigation.navigate("CadastrarCartao")
    }

    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <Header text="Cartão"/>
        <View style={{backgroundColor: "white", height: "100%", alignItems: 'center'}}>
            <View style={styles.mcView}>
                <Text style={styles.txt}>Meus cartões</Text>
            </View>
            <View style={styles.opcoes}>
                <View style={{marginBottom: "5%"}}>
                    <View style={styles.bt}> 
                            <IconFeather name='credit-card' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Visa - Débito</Text>
                                <Text style={styles.btTxt}>Final: 7585</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name='delete' color='red' size={22}/>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginBottom: "5%"}}>
                    <View style={styles.bt}> 
                            <IconFeather name='credit-card' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Visa - Débito</Text>
                                <Text style={styles.btTxt}>Final: 7585</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name='delete' color='red' size={22}/>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginBottom: "5%"}}>
                    <View style={styles.bt}> 
                            <IconFeather name='credit-card' color='rgba(0,0,0,0.7)' size={25}/>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Visa - Débito</Text>
                                <Text style={styles.btTxt}>Final: 7585</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name='delete' color='red' size={22}/>
                            </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginTop: '2%'}}>
                    <TouchableOpacity style={styles.btAdd} onPress={navigateToCadastrarCartao}>
                        <Text style={styles.txtAdd}>Adicionar cartão</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    mcView:{
        width:'80%',
        marginTop: 25
    },
    
    txt:{
        fontSize: 19,
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'center'
    },
    
    opcoes:{
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    
    bt:{
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        width: '85%',
        height: 70,
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
        paddingHorizontal: 12
    },

    touch:{
        width: '100%', 
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
    btAdd:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        height: 42,
        backgroundColor: '#23AFDB',
        borderRadius: 50
    },

    txtAdd:{
        textAlign:"center", 
        fontSize: 17, 
        color: 'white'
    },
});