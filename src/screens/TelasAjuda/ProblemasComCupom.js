import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Header from '../../componentes/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';

export default function ProblemasComCupom({navigation}){
    
    function navigateToSac(){
        navigation.navigate('TelaSac');
    }
    
    return(
    <>
    <Header text="Ajuda"/>
    <View style={styles.container}>
          <View style={styles.viewProblemasPedido}>
                <Text style={styles.txtProblemasPedido}>Não consigo utilizar um cupom</Text>
          </View>
          <View style={styles.viewTxt1}>
              <Text style={styles.txt1}>Alguns fatores podem ser os causadores desse problema:</Text>
          </View>
          <View style={styles.viewTxt1}>
              <Text style={styles.txt1}>1 - Verifique se o estabelecimento está participando da promoção;</Text>
          </View>
          <View style={styles.viewTxt1}>
              <Text style={styles.txt1}>2 - Certifique-se de que o cupom já não foi utilizado. Para isso vá até "Perfil", e aperte em "Cupons";</Text>
          </View>
          <View style={styles.viewTxt1}>
              <Text style={styles.txt1}>3 - Verifique se a data de validade do cupom não expirou.</Text>
          </View>
          <View style={styles.viewTxt1}>
              <Text style={styles.txt1}>Se o problema persistir, entre em contato conosco e informe o ocorrido</Text>
          </View>
          <View style={styles.viewBt}>
            <TouchableOpacity style={styles.btContato} onPress={navigateToSac}>
                <Text style={styles.txtContato}>Entrar em contato</Text>
            </TouchableOpacity>
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