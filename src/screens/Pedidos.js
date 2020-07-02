import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from '../componentes/Header';
import {useEffect, useState} from 'react';
import Remedio from '../../assets/imgs/remedio.png';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import gifTriste from '../../assets/imgs/gifTriste2.gif';
import Moment from 'moment';

export default function Pedidos({navigation}) {
  const [idCliente, setIdCliente] = useState('');
  const [pedido, setPedido] = useState([]);
  //const [loading, setLoading] = useState(true);
  Moment.locale('pt-BR');

  useEffect(() => {
    pegarIdCliente();
  });

  async function pegarIdCliente() {
    try {
      const idCliente = await AsyncStorage.getItem('idCliente');
      setIdCliente(idCliente);
      pegarPedidos();
    } catch (error) {
      console.log(error);
    }
  }

  async function pegarPedidos() {
    try {
      const response = await api.get('/Venda/', {
        params: {idCliente: idCliente},
      });
      const data = response.data.response;
      setPedido(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function navigateToHome() {
    navigation.navigate('Home', {screen: 'Home'});
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header text="Pedidos" />
      <View style={styles.container}>
        {/*loading &&
         <View style={styles.container2}>
            <ActivityIndicator></ActivityIndicator>
        </View>
        */}

        {pedido != '' && (
          <View style={styles.opcoes}>
            <View style={styles.mcView}>
              <Text style={styles.txt}>Meus pedidos</Text>
            </View>
            <FlatList
              data={pedido}
              showsVerticalScrollIndicator={false}
              keyExtractor={pedido => String(pedido.idvenda)}
              style={{marginBottom: 200, marginTop: 30, height: '100%'}}
              renderItem={({item: pedido}) => (
                <View style={styles.btView}>
                  <View style={styles.bt}>
                    <Image source={Remedio} style={styles.imgProd} />
                    <View style={styles.btTxtView}>
                      <Text style={styles.btTxt}>
                        Número do pedido:{' '}
                        <Text style={styles.btTxtBold}>#{pedido.idVenda}</Text>
                      </Text>
                      <Text style={styles.btTxt}>
                        Data:{' '}
                        <Text style={styles.btTxtBold}>
                          {Moment(pedido.dataVenda).format('DD/MM/YYYY')}
                        </Text>
                      </Text>
                      <Text style={styles.btTxt}>
                        Status:{' '}
                        <Text style={styles.btTxtBold}>
                          {pedido.descStatusVenda}
                        </Text>
                      </Text>
                      <Text style={styles.btTxt}>
                        Valor:{' '}
                        <Text style={styles.btTxtBold}>
                          {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(pedido.totalVenda)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
        {pedido == '' && (
          <View style={styles.container2}>
            <Text style={styles.txt2}>Você ainda não realizou pedidos</Text>
            <Image source={gifTriste} style={styles.gif} />
            <TouchableOpacity style={styles.btLogar} onPress={navigateToHome}>
              <Text style={styles.txtLogar}>Comprar agora!</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
  },

  container2: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mcView: {
    width: '80%',
    marginTop: 25,
  },

  txt: {
    fontSize: 19,
    color: 'rgba(0,0,0,0.65)',
    textAlign: 'center',
  },

  txt2: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 280,
  },

  opcoes: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btView: {
    marginBottom: '5%',
    alignItems: 'center',
  },

  bt: {
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.4)',
    width: '90%',
    height: 120,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 50,
  },

  touch: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btTxtView: {
    width: '100%',
    marginLeft: '5%',
    justifyContent: 'center',
  },

  btTxt: {
    fontSize: 16,
    color: 'rgba(70,70,70,0.8)',
  },

  btTxtBold: {
    fontSize: 16,
    color: 'rgba(70,70,70,0.8)',
    fontWeight: 'bold',
  },

  btAddView: {
    marginTop: '2%',
  },

  btAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
    height: 42,
    backgroundColor: '#23AFDB',
    borderRadius: 50,
  },

  txtAdd: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },

  imgProd: {
    width: 50,
    height: 50,
  },

  btLogar: {
    backgroundColor: '#23AFDB',
    width: 155,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtLogar: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  gif: {
    width: 130,
    height: 130,
    marginTop: 10,
    marginBottom: 10,
  },
});
