import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Header from '../componentes/Header';
import Input from '../componentes/inputBasico';
import { useState } from 'react';
import api from '../services/api';
import { useRoute } from '@react-navigation/native';


export default function CadatrarCupom({navigation}){
    const [cupom, setCupom] = useState();
    const route = useRoute();
    const idCliente = route.params.idCliente;

    async function buscarCupom(){
        try{
        const response = await api.get('/Cupom/', {params: {cupom: cupom}});
        const data = response.data.response;
     
        if(data == "Cupom não encontrado"){
            alert(data);
        }else{
           verificaCupom(data);
        }
        }catch(error){
            console.log(error);
        }
    }

    async function verificaCupom(data){
        var idCupom;
        
        data.map(item => {
            idCupom = item.idCupom;
        });
      
        const response = await api.get('/CuponsCliente/', {params: {idCupom: idCupom, idCliente: idCliente}});
        const data2 = response.data.response;
        console.log(data2)
      
        if(data2 == "Erro de parametros: BAD REQUEST" || data2 == ''){
           console.log('válido');
           aplicaCupom(data);
        }else{
           alert('Cupom já utilizado!');
        }
    }

    async function aplicaCupom(data){
        var idCupom;
        var cupom;
        var valorCupom;
        data.map(item => {
            idCupom = item.idCupom;
            cupom = item.cupom;
            valorCupom = item.valorCupom;
        });
        navigateToPedido(idCupom, cupom, valorCupom);
    }

    function navigateToPedido(idCupom, cupom, valorCupom){
        navigation.navigate('Pedido', {idCupom, cupom, valorCupom});
    }

    return(
        <>
            <Header text="Adicionar Cupom"/>
            <View style={styles.fundo}>
                <View style={styles.mcView}>
                    <Text style={styles.txt}>Insira o cupom abaixo</Text>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            returnKeyType="done"
                            autoCapitalize="characters"
                            autoCompleteType="off"
                            autoCorrect={false}
                            placeholderTextColor="#666"
                            placeholder="Código do cupom"
                            onChangeText={cupom => setCupom(cupom)}
                        />
                    </View>
                </View>

                <View style={styles.btAddView}>
                    <TouchableOpacity style={styles.btAdd} onPress={()=> buscarCupom()}>
                        <Text style={styles.txtAdd}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    fundo:{
        backgroundColor:"white", 
        height: '100%', 
        alignItems: 'center'
    },

    mcView:{
        width:'60%',
        marginTop: 25
    },
    
    txt:{
        fontSize: 17,
        color: 'rgba(0,0,0,0.60)',
        textAlign: 'center'
    },

    inputView:{
        width: '75%'
    },

    btAddView:{
        marginTop: '7%'
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

    inputContainer: {
        borderColor: 'rgba(70,70,70, 0.31)',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 25,
        flexDirection: 'row',
       
      },
    
      input: {
        fontSize: 16,
        color: '#666',
        flex: 1
      }
})