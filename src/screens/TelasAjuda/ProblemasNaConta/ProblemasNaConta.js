import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Header from '../../../componentes/Header';
import { TouchableOpacity} from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';

export default function ProblemasNaConta({navigation}){

    function navigateToAlterarDados(){
        navigation.navigate('AlterarDados');
    }

    function navigateToProblemasComEndereco(){
        navigation.navigate('ProblemasComEndereco');
    }

    return(
        <>
        <Header text="Ajuda"/>
        <View style={styles.container}>
              <View style={styles.viewDuvidasFrequentes}>
                    <Text style={styles.txtDuvidasFrequentes}>Problemas com a conta</Text>
              </View>
              <View style={styles.opcoes}>
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToAlterarDados} style={styles.touch}>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Alterar dados da conta</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' />
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.bt}> 
                        <TouchableOpacity onPress={navigateToProblemasComEndereco} style={styles.touch}>
                            <View style={styles.btView}>
                                <Text style={styles.btTxt}>Não encontro meu endereço</Text>
                            </View>
                            <IconFeather name='arrow-right' size={24} color='#23AFDB' style={{}}/>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'white'
    },

    viewDuvidasFrequentes:{
        marginTop: '5%',
        marginBottom: '5%'
    },

    txtDuvidasFrequentes:{
        color: 'rgba(70,70,70,0.9)',
        fontSize: 18
    },

    opcoes:{
        width: '100%',
        alignItems: 'center',
    }, 
    
    bt:{
        marginBottom: "6%",
        width: '85%', 
        height: 57, 
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    btLogout:{
        marginBottom: "5%",
        width: '89%', 
        height: 57, 
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    touch:{
        borderColor: "rgba(70,70,70,0.4)", 
        width: '100%', 
        height: 62, 
        borderWidth: 1,
        borderRadius: 8,  
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center'
    },

    btView:{
        width: '85%'
    },

    btTxt:{
        fontSize: 16, 
        paddingLeft: '2%',
        color: "rgba(70,70,70,0.9)"
    },

    shimmerNome: {
        borderRadius: 10,
        height: 25,
        width: 130,
    },
})