import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import Header from '../componentes/Header';

export default function Notificacoes(){
    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    return(
        <>
        <Header text="Notificações"/>
            <View style={styles.fundo}>
                <View style={styles.content}>
                    <View style={styles.opts}>
                        <View style={styles.opt}> 
                            <View style={styles.viewTxt}>
                                <Text style={styles.btTxt}>Receber notificações sobre o status do pedido</Text>
                            </View>
                            <View style={styles.checkIcon}>
                                <CheckBox
                                value={isSelected1}
                                onValueChange={setSelection1}
                                style={styles.checkbox}
                                />
                            </View>
                        </View>
                    </View>
                
                    <View style={styles.opts}>
                        <View style={styles.opt}> 
                            <View style={styles.viewTxt}>
                                <Text style={styles.btTxt}>Receber notificações sobre novos cupons e promoções</Text>
                            </View>
                            <View style={styles.checkIcon}>
                                <CheckBox
                                value={isSelected2}
                                onValueChange={setSelection2}
                                style={styles.checkbox}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fundo:{
        backgroundColor: "white", 
        height: "100%", 
        width:'100%', 
        alignItems: 'center'
    }, 

    content:{
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }, 

    opts:{
        marginBottom: "5%"
    },

    opt:{
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        height: 65,
        width: "90%",
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    viewTxt:{
        width: '80%'
    },

    checkIcon:{
        marginRight:'3%'
    },

    btTxt:{
        fontSize: 16, 
    marginRight: 50,
        color: 'gray'
    }
});