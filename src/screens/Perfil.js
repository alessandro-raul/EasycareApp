import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../componentes/Header';
import Brendon from '../../assets/imgs/brendon.jpg';
import {
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import gifTriste from '../../assets/imgs/gifTriste.gif';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Modal from 'react-native-modal';

export default function TelaPerfil({navigation}) {
  const [nomeCliente, setNomeCliente] = useState('');
  const [statusLogin, setStatusLogin] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [inicial, setInicial] = useState('');
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pegarStatus();
      pegarNome();
    });
    return unsubscribe;
  }, [navigation]);

  async function pegarStatus() {
    try {
      const status = await AsyncStorage.getItem('statusLogin');
      if (status == 'completo') {
        setStatusLogin(1);
      } else {
        setStatusLogin(2);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function pegarNome() {
    try {
      const nome = await AsyncStorage.getItem('nomeCliente');
      setNomeCliente(nome);

      setInicial(nome.charAt(0));
      //setTimeout(() => setInicial(nome.charAt(0)),1000);
      setTimeout(() => setVisible(true), 1000);
      setTimeout(() => setShowLoader(false), 1000);
    } catch (error) {
      console.log(error);
    }
  }

  async function pegarEndereco() {
    const endereco = await AsyncStorage.getItem('logCliente');
    const numLog = await AsyncStorage.getItem('numLogCliente');
    //console.log(endereco, numLog);
  }

  function navigateToPedidos() {
    navigation.navigate('Pedidos');
  }

  function navigateToPagamentoPerfil() {
    navigation.navigate('PagamentoPerfil');
  }

  function navigateToIntroducao() {
    navigation.navigate('Introducao');
  }

  function navigateToEditarPerfil() {
    navigation.navigate('EditarPerfil');
  }

  function navigateToCupom() {
    navigation.navigate('Cupom');
  }

  function navigateToNotificacoes() {
    navigation.navigate('Notificacoes');
  }

  function navigateToEnderecos() {
    navigation.navigate('Enderecos');
  }

  function navigateToAjuda() {
    navigation.navigate('TelaAjuda');
  }

  async function navigateToPreLog() {
    try {
      await AsyncStorage.clear();
      const status = '1';
      await AsyncStorage.setItem('statusIntro', status);
      setModal(false);
      setTimeout(()=>navigation.navigate('PreLog'),200);
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    setModal(true);
  }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <Header text="Perfil" />
      {statusLogin == 0 && <View style={styles.container2} />}

      {statusLogin == 1 && (
        <ScrollView style={styles.fundo} showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <View
              style={{
                backgroundColor: '#23AFDB',
                width: '100%',
                height: '60%',
                alignItems: 'center',
              }}>
              {/*<Image source={Brendon} style={styles.imgPerfil}/>*/}
              <View style={styles.imgPerfil}>
                {!showLoader && (
                  <Text style={styles.txtInicial}>{inicial}</Text>
                )
                //<Text style={styles.txtLogin}>Salvar</Text>
                }

                {showLoader && (
                  <ActivityIndicator
                    animating={showLoader}
                    size="large"
                    color="#1d97bd"
                  />
                )}
              </View>
            </View>
            {/*
                    <View style={{width:'100%', height:'20%'}}>
                    </View>
                    */}
          </View>

          <View style={styles.infos}>
            <ShimmerPlaceholder
              style={styles.shimmerNome}
              autoRun={true}
              visible={visible}>
              <View style={styles.nomeCliente}>
                <Text style={styles.nomeClienteTxt}>{nomeCliente}</Text>
              </View>
            </ShimmerPlaceholder>
            <View style={{marginTop: '3%'}}>
              <TouchableOpacity
                style={styles.btEditar}
                onPress={navigateToEditarPerfil}>
                <Text style={styles.txtEditar}>Editar perfil</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.opcoes}>
            <View style={styles.bt}>
              <TouchableOpacity
                onPress={navigateToPedidos}
                style={styles.touch}>
                <IconFeather
                  name="shopping-bag"
                  color="rgba(0,0,0,0.7)"
                  size={22}
                />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Pedidos</Text>
                </View>
                <IconFeather name="arrow-right" size={24} color="#23AFDB" />
              </TouchableOpacity>
            </View>

            <View style={styles.bt}>
              <TouchableOpacity
                onPress={navigateToEnderecos}
                style={styles.touch}>
                <IconFeather name="map-pin" color="rgba(0,0,0,0.7)" size={22} />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Endereços</Text>
                </View>
                <IconFeather name="arrow-right" size={24} color="#23AFDB" />
              </TouchableOpacity>
            </View>

            <View style={styles.bt}>
              <TouchableOpacity
                onPress={navigateToPagamentoPerfil}
                style={styles.touch}>
                <IconFeather
                  name="credit-card"
                  color="rgba(0,0,0,0.7)"
                  size={22}
                />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Pagamento</Text>
                </View>
                <IconFeather
                  name="arrow-right"
                  size={24}
                  color="#23AFDB"
                  style={{}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bt}>
              <TouchableOpacity onPress={navigateToCupom} style={styles.touch}>
                <IconComunity
                  name="cards-outline"
                  color="rgba(0,0,0,0.7)"
                  size={25}
                />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Cupons</Text>
                </View>
                <IconFeather
                  name="arrow-right"
                  size={24}
                  color="#23AFDB"
                  style={{}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bt}>
              <TouchableOpacity
                style={styles.touch}
                onPress={navigateToNotificacoes}>
                <IconFeather name="bell" color="rgba(0,0,0,0.7)" size={22} />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Notificações</Text>
                </View>
                <IconFeather
                  name="arrow-right"
                  size={24}
                  color="#23AFDB"
                  style={{}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bt}>
              <TouchableOpacity onPress={navigateToAjuda} style={styles.touch}>
                <IconFeather
                  name="help-circle"
                  color="rgba(0,0,0,0.7)"
                  size={22}
                />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Ajuda</Text>
                </View>
                <IconFeather
                  name="arrow-right"
                  size={24}
                  color="#23AFDB"
                  style={{}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bt}>
              <TouchableOpacity onPress={logOut} style={styles.touch}>
                <IconFeather name="power" color="rgba(0,0,0,0.7)" size={22} />
                <View style={styles.btView}>
                  <Text style={styles.btTxt}>Sair</Text>
                </View>
                <IconFeather name="log-out" size={24} color="#23AFDB" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {statusLogin == 2 && (
        <View style={styles.container2}>
          <Text style={styles.nlTxt}>Você ainda não se logou...</Text>
          <Image source={gifTriste} style={styles.gif} />
          <TouchableOpacity style={styles.btLogar} onPress={navigateToPreLog}>
            <Text style={styles.txtLogar}>Logar agora!</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Modal
          isVisible={modal}
          style={styles.ModalView}
          onSwipeComplete={() => navigateToPreLog()}
          swipeDirection={['up']}
          onBackdropPress={() => setModal(false)}
          onBackButtonPress={() => setModal(false)}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={350}
          setTimeOut={3000}>
          <View style={styles.Modal}>
            <Text style={styles.OpsTxt}>Deseja mesmo sair?</Text>
            <View style={styles.AvisoModal}>
              <Text style={styles.AvisoTxt}>
                Se sim, deslize para cima ;)
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nlTxt: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 250,
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

  banner: {
    alignItems: 'center',
    height: 170,
  },

  imgPerfil: {
    borderRadius: 70,
    marginTop: 40,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: '#1d97bd',
    backgroundColor: '#fff',
  },

  txtInicial: {
    fontSize: 48,
    color: '#666',
    alignSelf: 'center',
  },

  infos: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  nomeCliente: {
    width: '80%',
  },

  nomeClienteTxt: {
    fontSize: 24,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.7)',
  },

  btEditar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
    height: 42,
    backgroundColor: '#23AFDB',
    borderRadius: 50,
  },

  txtEditar: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },

  opcoes: {
    marginTop: '7%',
    width: '100%',
    alignItems: 'center',
  },

  bt: {
    marginBottom: '5%',
    width: '85%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  btLogout: {
    marginBottom: '5%',
    width: '89%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  touch: {
    borderColor: 'rgba(70,70,70,0.4)',
    width: '100%',
    height: 57,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btView: {
    width: '80%',
  },

  btTxt: {
    fontSize: 16,
    paddingRight: '45%',
    paddingLeft: '5%',
    color: 'gray',
  },

  gif: {
    width: 150,
    height: 150,
  },

  shimmerNome: {
    borderRadius: 10,
    height: 25,
    width: 130,
  },

  ModalView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  Modal: {
    backgroundColor: 'white',
    width: 300,
    minHeight: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  OpsTxt: {
    marginTop: 20,
    fontSize: 20,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
  },

  AvisoModal: {
    marginTop: 20,
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    paddingBottom: 35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  AvisoTxt: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
