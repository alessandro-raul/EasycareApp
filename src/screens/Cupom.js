import React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';


export default function Cupom({navigation}){

    function navigateToCadastrarCupom(){
        navigation.navigate("CadastrarCupom")
    }

    return(
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
            <Header text="Cupons"/>
            <View style={styles.fundo}>
                <View style={styles.mcView}>
                    <Text style={styles.txt}>Meus cupons</Text>
                </View>
                <View style={styles.opcoes}>
                    <View style={styles.btView}>
                        <View style={styles.bt}> 
                                <IconAwesome name='ticket' color='rgba(0,0,0,0.7)' size={25}/>
                                <View style={styles.btTxtView}>
                                    <Text style={styles.btTxt}>Cupom: 100-OFF</Text>
                                    <Text style={styles.btTxt}>Valor: R$100</Text>
                                </View>
                                <TouchableOpacity>
                                    <Icon name='delete' color='red' size={22}/>
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.btView}>
                        <View style={styles.bt}> 
                                <IconAwesome name='ticket' color='rgba(0,0,0,0.7)' size={25}/>
                                <View style={styles.btTxtView}>
                                    <Text style={styles.btTxt}>Cupom: 100-OFF</Text>
                                    <Text style={styles.btTxt}>Valor: R$100</Text>
                                </View>
                                <TouchableOpacity>
                                    <Icon name='delete' color='red' size={22}/>
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.btView}>
                        <View style={styles.bt}> 
                                <IconAwesome name='ticket' color='rgba(0,0,0,0.7)' size={25}/>
                                <View style={styles.btTxtView}>
                                    <Text style={styles.btTxt}>Cupom: 100-OFF</Text>
                                    <Text style={styles.btTxt}>Valor: R$100</Text>
                                </View>
                                <TouchableOpacity>
                                    <Icon name='delete' color='red' size={22}/>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.btAddView}>
                    <TouchableOpacity style={styles.btAdd} onPress={navigateToCadastrarCupom}>
                        <Text style={styles.txtAdd}>Adicionar cupom</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    fundo:{
        backgroundColor: "white", 
        height: "100%", 
        alignItems: 'center'
    },

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

    btView:{
        marginBottom: "5%"
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

    btTxtView:{
        width: '80%'
    },

    btTxt:{
        fontSize: 16, 
        paddingRight: '45%', 
        paddingLeft: '5%',
        color: 'gray'
    },

    btAddView:{
        marginTop: '2%'
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