import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import Header from '../componentes/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import api from '../services/api';



export default function Pagamento({navigation}){
    const [formaPagamento, setFormaPagamento] = useState();

    useEffect(() => {
        pegarFormaPagamento();
      }, []);

    function navigateToPedido(idFormaPagamento, formaPagamento){
        navigation.navigate('Pedido', {idFormaPagamento, formaPagamento});
    }

    async function pegarFormaPagamento(){
        try {
            const response = await api.get('/FormaPagamento/');
            const data = response.data.response;
            setFormaPagamento(data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <Header text="Pagamento"/>
        <View style={{backgroundColor: "white", height: "100%"}}>
            <View style={styles.opcoes}>
                    <Text style={styles.txt}>Escolha uma das formas de pagamento abaixo:</Text>
                    <FlatList
                    data={formaPagamento}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    style={styles.flatlist}
                    keyExtractor={pagamentos => String(pagamentos.idFormaPagamento)}
                    renderItem={({ item:pagamentos }) => (
                    <TouchableOpacity onPress={()=>navigateToPedido(pagamentos.idFormaPagamento, pagamentos.tipoPagamento)} style={styles.touch}>
                        <IconFeather name='dollar-sign' color='rgba(0,0,0,0.7)' size={24}/>
                        <View style={styles.btView}>
                            <Text style={styles.btTxt}>{pagamentos.tipoPagamento}</Text>
                        </View>
                    </TouchableOpacity>
                    )}/>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    flatlist:{
        height: '100%'
    },

    opcoes:{
        marginTop: '7%',
        width: '100%',
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    
    bt:{
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        width: '85%',
        height: 50, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    bt2:{
        borderWidth: 1, 
        marginTop: 15,
        borderColor: "rgba(70,70,70,0.4)", 
        width: '85%',
        height: 50, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    touch:{
        width: '100%', 
        marginTop: 15,
        marginBottom: 2,
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: "rgba(70,70,70,0.4)", 
        height: 50, 
        borderRadius: 8,  
        alignItems:'center', 
        justifyContent:'center', 
        flexDirection: 'row',
    },

    btView:{
        width: '80%'
    },

    btTxt:{
        fontSize: 16, 
        paddingRight: '45%', 
        paddingLeft: '10%',
        color: 'gray'
    },

    txt:{
        width: '50%',
        marginBottom: 5,
        fontSize: 16,
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'center'
    },
});