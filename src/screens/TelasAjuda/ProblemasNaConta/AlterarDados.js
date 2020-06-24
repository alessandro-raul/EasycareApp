import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Header from '../../../componentes/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function AlterarDados({navigation}){
    
    function navigateToSac(){

    }
    
    return(
    <>
    <Header text="Ajuda"/>
    <View style={styles.container}>
          <View style={styles.viewProblemasPedido}>
                <Text style={styles.txtProblemasPedido}>Alterar dados da conta</Text>
          </View>
          <View style={styles.viewTxt1}>
              <Text style={styles.txt1}>É possível alterar informações como nome, CPF, endereços, cartão de crédito e email. Para tal, entre em "Perfil" e aperte no botão "Editar perfil".</Text>
          </View>
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    container:{
        height: '100%', 
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },

    viewProblemasPedido:{
        marginTop: '5%',
        marginBottom: '5%'
    },

    txtProblemasPedido:{
        color: 'rgba(70,70,70,0.9)',
        fontSize: 18
    },

    viewTxt1:{
        width: '80%',
        alignItems: 'center',
        marginBottom: '5%'
    },

    txt1:{
        color: 'gray',
        fontSize: 15
    },

    btContato:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 165,
        height: 40,
        backgroundColor: '#23AFDB',
        borderRadius: 50
    },

    txtContato:{
        textAlign:"center", 
        fontSize: 15, 
        color: 'white'
    },

})