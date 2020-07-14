import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import Header from '../componentes/Header';
import IconFeather from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {useRoute} from '@react-navigation/native';
import Modal from 'react-native-modal';
import { TextInputMask } from 'react-native-masked-text';


export default function AdicionarEndereco({navigation}) {
  const [idCliente, setIdCliente] = useState('');
  const [logCliente, setLogCliente] = useState('');
  const [numLogCliente, setNumLogCliente] = useState('');
  const [cepLogCliente, setCepLogCliente] = useState('');
  const [complementoLogCliente, setComplementoCliente] = useState('');
  const [bairroLogCliente, setBairroLogCliente] = useState('');
  const [cidadeLogCliente, setCidadeLogCliente] = useState('');
  const [ufLogCliente, setUfLogCliente] = useState('');
  const [idLocal, setidLocal] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const route = useRoute();
  var id;
  var idEnd;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pegarGps();
    });
    return unsubscribe;
  }, [navigation]);

  function pegarGps() {
    try {
      const logCliente = route.params.logCliente;
      const numLogCliente = route.params.numLogCliente;
      const cepLogCliente = route.params.cepLogCliente;
      const bairroLogCliente = route.params.bairroLogCliente;
      const cidadeLogCliente = route.params.cidadeLogCliente;

      setLogCliente(logCliente);
      setNumLogCliente(numLogCliente);
      setCepLogCliente(cepLogCliente);
      setBairroLogCliente(bairroLogCliente);
      setCidadeLogCliente(cidadeLogCliente);
    } catch (error) {
      console.log(error);
    }
  }

  async function pegarIdCliente() {
    try {
      setShowLoader(true);
      id = await AsyncStorage.getItem('idCliente');
      AdicionaEndereco();
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  }

  async function AdicionaEndereco() {
    if (
      logCliente != undefined &&
      numLogCliente != undefined &&
      cepLogCliente != undefined &&
      cepLogCliente.search('-') != -1 &&
      complementoLogCliente != undefined &&
      complementoLogCliente != '' &&
      complementoLogCliente != null &&
      idLocal != undefined &&
      idLocal != '' &&
      idLocal != null &&
      bairroLogCliente != undefined &&
      cidadeLogCliente != undefined &&
      ufLogCliente != undefined
    ) {
      try {
        const data = {
          idCliente: id,
          logCliente: logCliente,
          numLogCliente: numLogCliente,
          cepLogCliente: cepLogCliente,
          complementoLogCliente: complementoLogCliente,
          bairroLogCliente: bairroLogCliente,
          cidadeLogCliente: cidadeLogCliente,
          ufLogCliente: ufLogCliente,
          idLocal: idLocal,
        };
        setShowLoader(true);
        await api.post('/UserAdress/', data);
        setShowLoader(false);
        setModalTwo(true);
      } catch (error) {
        setShowLoader(false);
        alert(error);
      }
    } else {
      setModal(true);
      //alert(`Dados invalidos, verifique os campos, Cep deve ser preenchido com a pontuação Ex: 00000-000.`);
      setShowLoader(false);
    }

    /*
        try {
            const data = {
                idCliente: id,
                logCliente: logCliente,
                numLogCliente: numLogCliente,
                cepLogCliente: cepLogCliente,
                complementoLogCliente: complementoLogCliente,
                bairroLogCliente: bairroLogCliente,
                cidadeLogCliente: cidadeLogCliente,
                ufLogCliente: ufLogCliente,
                idLocal: idLocal
            }
            setShowLoader(true);
            await api.post('/UserAdress/', data);
            setShowLoader(false);
            Alert.alert(
                "Easycare",
                "Endereço adicionado com sucesso!",
                [
                  { text: "OK", onPress: () => voltar() }
                ],
                { cancelable: false }
              );
        }catch (error) {
            setShowLoader(false)
            alert(error);
        }
        */
  }

  function voltar() {
    setModalTwo(false);
    setTimeout(() => navigation.navigate('Home'), 200);
  }

  return (
    <>
      <Header text="Adicionar Endereço" />
      <ScrollView style={{width: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.mcView}>
            <IconFeather name="map-pin" size={20} color="rgba(0,0,0,0.75)" />
            <Text style={styles.txt}>Preencha os dados abaixo</Text>
          </View>
          <View style={{width: '80%'}}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                returnKeyType="next"
                autoCapitalize="sentences"
                keyboardType="default"
                placeholder="Endereço"
                placeholderTextColor="#666"
                value={logCliente}
                onChangeText={logCliente => setLogCliente(logCliente)}
                onSubmitEditing={() => this.input2.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '35%', marginRight: '5%'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  keyboardType="default"
                  autoCorrect={false}
                  placeholder="Número"
                  placeholderTextColor="#666"
                  value={numLogCliente}
                  onChangeText={numLogCliente =>
                    setNumLogCliente(numLogCliente)
                  }
                  ref={(input) => {
                    this.input2 = input;
                  }}
                  //onSubmitEditing={() => this.input3.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={{width: '40%'}}>
              <View style={styles.inputContainer}>
                <TextInputMask
                  type={'zip-code'}
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  keyboardType="numeric"
                  autoCorrect={false}
                  placeholder="CEP"
                  placeholderTextColor="#666"
                  value={cepLogCliente}
                  onChangeText={cepLogCliente =>
                    setCepLogCliente(cepLogCliente)
                  }
                  /*ref={(input) => {
                    this.input3 = input;
                  }}*/
                  onSubmitEditing={() => this.input4.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>
          <View style={{width: '80%'}}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                returnKeyType="go"
                autoCapitalize="sentences"
                keyboardType="default"
                placeholder="Complemento"
                placeholderTextColor="#666"
                onChangeText={complementoLogCliente =>
                  setComplementoCliente(complementoLogCliente)
                }
                ref={input => {
                  this.input4 = input;
                }}
                
                 onSubmitEditing={() => this.input5.focus()}
                  blurOnSubmit={false}
                            
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
              onValueChange={idLocal => setidLocal(idLocal)}
              items={[
                {label: 'Residência', value: 1, color: '#666'},
                {label: 'Comércio', value: 2, color: '#666'},
              ]}
              placeholder={{
                label: 'Tipo de endereço',
                value: null,
                color: '#666',
              }}
            />
          </View>

          <View style={{width: '80%'}}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                returnKeyType="next"
                autoCapitalize="sentences"
                keyboardType="default"
                placeholder="Bairro"
                placeholderTextColor="#666"
                value={bairroLogCliente}
                onChangeText={bairroLogCliente =>
                  setBairroLogCliente(bairroLogCliente)
                }
                ref={input => {
                  this.input5 = input;
                }}
                onSubmitEditing={() => this.input6.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%', marginRight: '5%'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="sentences"
                  keyboardType="default"
                  placeholder="Cidade"
                  placeholderTextColor="#666"
                  value={cidadeLogCliente}
                  onChangeText={cidadeLogCliente =>
                    setCidadeLogCliente(cidadeLogCliente)
                  }
                  ref={input => {
                    this.input6 = input;
                  }}
                  onSubmitEditing={() => this.input7.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <View style={{width: '25%'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  returnKeyType="done"
                  autoCapitalize="characters"
                  autoCompleteType="off"
                  autoCorrect={false}
                  maxLength={2}
                  placeholder="UF"
                  placeholderTextColor="#666"
                  onChangeText={ufLogCliente => setUfLogCliente(ufLogCliente)}
                  ref={input => {
                    this.input7 = input;
                  }}
                  onSubmitEditing={pegarIdCliente}
                  //blurOnSubmit={false}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: '7%', marginBottom: '7%'}}>
            <TouchableOpacity style={styles.btAdd} onPress={pegarIdCliente}>
              {!showLoader && <Text style={styles.txtAdd}>Adicionar</Text>}

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
                Não foi possivel cadastrar, verifique os campos e tente
                novamente :(
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
                Endereço cadastrado com sucesso ;)
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
    flex: 1,
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

  AvisoTxt2: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
