import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import gifTriste from '../../assets/imgs/gifTriste2.gif';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export default function Cupom({navigation}) {
  const [idCliente, setIdCliente] = useState('');
  const [cupom, setCupom] = useState([]);

  useEffect(() => {
    pegarIdCliente();
  });

  async function pegarIdCliente() {
    try {
      const idCliente = await AsyncStorage.getItem('idCliente');
      setIdCliente(idCliente);
      pegarCupons();
    } catch (error) {
      console.log(error);
    }
  }

  async function pegarCupons() {
    try {
      const response = await api.get('/CuponsCliente/', {
        params: {idCliente: idCliente},
      });
      const data = response.data.response;
      setCupom(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header text="Cupons" />
      {cupom != 'Erro de parametros: BAD REQUEST' && (
        <View style={styles.fundo}>
          <View style={styles.mcView}>
            <Text style={styles.txt}>Cupons já utilizados</Text>
          </View>
          <View style={styles.opcoes}>
            <FlatList
              data={cupom}
              showsVerticalScrollIndicator={false}
              keyExtractor={cupom => String(cupom.idcuponscliente)}
              style={{marginBottom: 130, marginTop: 30, height: '100%'}}
              renderItem={({item: cupom}) => (
                <View style={styles.btView}>
                  <View style={styles.bt}>
                    <IconComunity
                      name="cards-outline"
                      color="rgba(0,0,0,0.7)"
                      size={25}
                    />
                    <View style={styles.btTxtView}>
                      <Text style={styles.btTxt}>Cupom: {cupom.cupom}</Text>
                      <Text style={styles.btTxt}>
                        Valor: {cupom.valorCupom}%
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}

      {cupom == 'Erro de parametros: BAD REQUEST' && (
        <View style={styles.container2}>
          <Text style={styles.txt2}>Você ainda não utilizou cupons...</Text>
          <Image source={gifTriste} style={styles.gif} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
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
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },

  touch: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btTxtView: {
    width: '80%',
  },

  btTxt: {
    fontSize: 16,
    paddingRight: '45%',
    paddingLeft: '5%',
    color: 'gray',
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

  container2: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt2: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 280,
  },

  gif: {
    width: 130,
    height: 130,
    marginTop: 10,
    marginBottom: 10,
  },
});
