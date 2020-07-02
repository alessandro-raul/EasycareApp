import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '../componentes/inputBasico';
import RNPickerSelect from 'react-native-picker-select';
import api from '../services/api';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

export default function EditarEndereco({navigation}) {
  const [idCliente, setIdCliente] = useState('');
  const [idEnderecoCliente, setIdEnderecoCliente] = useState('');
  const [logCliente, setLogCliente] = useState('');
  const [numLogCliente, setNumLogCliente] = useState('');
  const [cepLogCliente, setCepLogCliente] = useState('');
  const [complementoLogCliente, setComplementoCliente] = useState('');
  const [bairroLogCliente, setBairroLogCliente] = useState('');
  const [cidadeLogCliente, setCidadeLogCliente] = useState('');
  const [ufLogCliente, setUfLogCliente] = useState('');
  const [tipoEndereco, setTipoEndereco] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  var id;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pegarEndereco();
    });
    return unsubscribe;
  }, [navigation]);

  function navigateToAdicionar() {
    navigation.navigate('AdicionarEndereco');
  }

  async function pegarEndereco() {
    const log = await AsyncStorage.getItem('logCliente');
    const Nlog = await AsyncStorage.getItem('numLogCliente');
    const CEP = await AsyncStorage.getItem('cepCliente');
    const complemento = await AsyncStorage.getItem('complementoLogCliente');
    const bairro = await AsyncStorage.getItem('bairroLogCliente');
    const cidade = await AsyncStorage.getItem('cidadeLogCliente');
    const uf = await AsyncStorage.getItem('ufLogCliente');
    const tp = await AsyncStorage.getItem('tipoEndereco');
    const idEnd = await AsyncStorage.getItem('idEnderecoCliente');
    const id = await AsyncStorage.getItem('idCliente');

    setLogCliente(log);
    setNumLogCliente(Nlog);
    setCepLogCliente(CEP);
    setComplementoCliente(complemento);
    setBairroLogCliente(bairro);
    setCidadeLogCliente(cidade);
    setUfLogCliente(uf);
    setTipoEndereco(tp);
    setIdEnderecoCliente(idEnd);
    setIdCliente(id);
  }

  async function AtualizarEndereco() {
    try {
      const data = {
        idEnderecoCliente: idEnderecoCliente,
        idCliente: idCliente,
        logCliente: logCliente,
        numLogCliente: numLogCliente,
        cepLogCliente: cepLogCliente,
        complementoLogCliente: complementoLogCliente,
        bairroLogCliente: bairroLogCliente,
        cidadeLogCliente: cidadeLogCliente,
        ufLogCliente: ufLogCliente,
        idLocal: tipoEndereco,
      };

      setShowLoader(true);
      await api.put('/UserAdress/', data, {
        params: {idEnderecoCliente: idEnderecoCliente},
      });
      setShowLoader(false);
      setModalTwo(true);
    } catch (error) {
      setShowLoader(false);
      setModal(true);
    }
  }

  function voltar() {
    setModalTwo(false);
    setTimeout(() => navigation.navigate('Home'), 200);
  }

  return (
    <>
      <Header text="Editar Endereço" />
      <ScrollView style={{width: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.mcView}>
            <Icon name="edit-location" size={22} color="rgba(0,0,0,0.75)" />
            <Text style={styles.txt}>Preencha os dados abaixo</Text>
          </View>

          <View style={{width: '80%'}}>
            <Input
              placeholder="Endereço"
              value={logCliente}
              onChangeText={logCliente => setLogCliente(logCliente)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '35%', marginRight: '5%'}}>
              <Input
                placeholder="Número"
                value={numLogCliente}
                onChangeText={numLogCliente => setNumLogCliente(numLogCliente)}
              />
            </View>
            <View style={{width: '40%'}}>
              <Input
                placeholder="CEP"
                value={cepLogCliente}
                onChangeText={cepLogCliente => setCepLogCliente(cepLogCliente)}
              />
            </View>
          </View>
          <View style={{width: '80%'}}>
            <Input
              placeholder="Complemento"
              value={complementoLogCliente}
              onChangeText={complementoLogCliente =>
                setComplementoCliente(complementoLogCliente)
              }
            />
          </View>
          <View style={{width: '80%'}}>
            <Input
              placeholder="Bairro"
              value={bairroLogCliente}
              onChangeText={bairroLogCliente =>
                setBairroLogCliente(bairroLogCliente)
              }
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%', marginRight: '5%'}}>
              <Input
                placeholder="Cidade"
                value={cidadeLogCliente}
                onChangeText={cidadeLogCliente =>
                  setCidadeLogCliente(cidadeLogCliente)
                }
              />
            </View>
            <View style={{width: '25%'}}>
              <Input
                placeholder="UF"
                value={ufLogCliente}
                onChangeText={ufLogCliente => setUfLogCliente(ufLogCliente)}
              />
            </View>
          </View>
          <View
            style={{
              width: '80%',
              borderWidth: 1,
              borderRadius: 10,
              marginTop: '5%',
              borderColor: 'rgba(70,70,70, 0.31)',
            }}>
            <RNPickerSelect
              value={tipoEndereco}
              onValueChange={tipoEndereco => setTipoEndereco(tipoEndereco)}
              items={[
                {label: 'Residência', value: 1},
                {label: 'Comércio', value: 2},
              ]}
              placeholder={{label: 'Tipo de endereço', value: null}}
            />
          </View>
          <View style={{marginTop: '7%', marginBottom: '7%'}}>
            <TouchableOpacity onPress={AtualizarEndereco} style={styles.btAdd}>
              {!showLoader && <Text style={styles.txtAdd}>Salvar</Text>}

              {showLoader && (
                <ActivityIndicator
                  animating={showLoader}
                  size="small"
                  color="white"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View>
        <Modal
          isVisible={modal}
          style={styles.ModalView}
          onSwipeComplete={() => setModal(false)}
          swipeDirection={['down']}
          animationIn="zoomIn"
          animationInTiming={300}
          animationOutTiming={600}
          setTimeOut={3000}>
          <View style={styles.Modal}>
            <Text style={styles.OpsTxt}>Ops...</Text>
            <View style={styles.AvisoModal}>
              <Text style={styles.AvisoTxt}>
                Não foi possivel editar, verifique os campos e tente novamente
                :(
              </Text>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          isVisible={modalTwo}
          style={styles.ModalView}
          onSwipeComplete={() => voltar()}
          swipeDirection={['down']}
          animationIn="zoomIn"
          animationInTiming={300}
          animationOutTiming={300}>
          <View style={styles.Modal}>
            <Text style={styles.OpsTxt}>Hey!</Text>
            <View style={styles.AvisoModal}>
              <Text style={styles.AvisoTxt}>
                Endereço editado com sucesso ;)
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mcView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%',
    marginTop: 25,
  },

  txt: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.60)',
    textAlign: 'center',
    marginLeft: '2%',
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

  ModalView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  Modal: {
    backgroundColor: 'white',
    width: 300,
    paddingHorizontal: 5,
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

  AvisoTxt2: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
