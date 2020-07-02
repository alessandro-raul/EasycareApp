import React, {useState, useEffect} from 'react';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Feather';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Brendon from '../../assets/imgs/brendon.jpg';
import Input from '../componentes/InputComIconQuad';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

export default function EditarPerfil({navigation}) {
  useEffect(() => {
    pegarDados();
  }, []);

  const [idCliente, setIdCliente] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [senhaCliente, setSenhaCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [inicial, setInicial] = useState('');

  var idLoginCliente;
  var idFoneCliente;

  const [showLoader, setShowLoader] = useState(false);

  async function pegarDados() {
    try {
      const id = await AsyncStorage.getItem('idCliente');
      const nome = await AsyncStorage.getItem('nomeCliente');
      const cpf = await AsyncStorage.getItem('CPF');
      const email = await AsyncStorage.getItem('emailCliente');
      const senha = await AsyncStorage.getItem('senhaCliente');
      const telefone = await AsyncStorage.getItem('telefoneCliente');
      setIdCliente(id);
      setNomeCliente(nome);
      setInicial(nome.charAt(0));
      setCpfCliente(cpf);
      setEmailCliente(email);
      setSenhaCliente(senha);
      setTelefoneCliente(telefone);
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  }

  function validaCPF(strCPF) {
    if (strCPF.length != 0 && strCPF.length === 11) {
      let cpf = strCPF;
      let digitoA = 0;
      let digitoB = 0;

      for (let i = 0, x = 10; i <= 8; i++, x--) {
        digitoA += cpf[i] * x;
      }

      for (let i = 0, x = 11; i <= 9; i++, x--) {
        if (String(i).repeat(11) == cpf) {
          return false;
          break;
        }

        digitoB += cpf[i] * x;
      }

      let somaA = digitoA % 11 < 2 ? 0 : 11 - (digitoA % 11);
      let somaB = digitoB % 11 < 2 ? 0 : 11 - (digitoB % 11);

      if (somaA != cpf[9] || somaB != cpf[10]) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  function validaEmail(email) {
    usuario = email.substring(0, email.indexOf('@'));
    dominio = email.substring(email.indexOf('@') + 1, email.length);

    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search('@') == -1 &&
      dominio.search('@') == -1 &&
      usuario.search(' ') == -1 &&
      dominio.search(' ') == -1 &&
      dominio.search('.') != -1 &&
      dominio.indexOf('.') >= 1 &&
      dominio.lastIndexOf('.') < dominio.length - 1
    ) {
      return true;
      //console.log("E-mail válido");
    } else {
      //console.log('E-mail inválido');
      return false;
    }
    //console.log(usuario+'@'+dominio);
  }

  function validaSenha(senha) {
    if (senha.length != 0 && senha.length >= 8 && senha.search(' ') == -1) {
      //console.log(senha+' valida');
      return true;
    } else {
      //console.log(senha+' Invalida');
      return false;
    }
  }

  async function atualizarUsuario() {
    if (
      nomeCliente.length >= 8 &&
      nomeCliente.search(' ') != -1 &&
      validaCPF(cpfCliente) &&
      telefoneCliente.length === 11 &&
      validaEmail(emailCliente) &&
      validaSenha(senhaCliente)
    ) {
      try {
        setShowLoader(true);
        const data = {
          nomeCliente: nomeCliente,
          cpfCliente: cpfCliente,
        };
        await api.put('/User/?idCliente=', data, {params: {idCliente}});
        pegarIdLogin();
      } catch (error) {
        setShowLoader(false);
        alert(error);
      }
    } else {
      setModal(true);
      /*alert(`${nomeCliente.length >= 8 && nomeCliente.search(" ") != -1 ? '' : 'Nome inválido, insira nome e sobrenome, Ex: Maria Silva.'} 
${validaCPF(cpfCliente) ? '' : 'CPF inválido, insira um CPF sem pontuções, Ex: 12345678912.'}
${telefoneCliente.length === 11 ? '' : 'Telefone inválido, insira o numero com o DDD sem pontuação, Ex: 1112345678.'}
${validaEmail(emailCliente) ? '' : 'E-mail inválido, verifique-o.'}
${validaSenha(senhaCliente) ? '' : 'Senha inválida, utilize uma senha com no minímo 8 digitos, sem espaços em branco.'}`);*/
    }

    /*
        try{ 
            setShowLoader(true);
            const data = {
                nomeCliente: nomeCliente,
                cpfCliente: cpfCliente
            }
            await api.put('/User/?idCliente=', data, { params: {idCliente} });
            pegarIdLogin();
        } catch (error){
            setShowLoader(false);
            alert(error);
        }
        */
  }

  async function pegarIdLogin() {
    try {
      const response = await api.get('/UserLogin/', {params: {idCliente}});
      const data = response.data.response;
      data.map(item => {
        idLoginCliente = item.idLoginCliente;
      });
      salvarIdLogin();
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  }

  async function salvarIdLogin() {
    try {
      await AsyncStorage.setItem('idLoginCliente', idLoginCliente);
      atualizarLoginUsuario();
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  }

  async function atualizarLoginUsuario() {
    try {
      const data = {
        emailCliente: emailCliente,
        senhaCliente: senhaCliente,
      };
      await api.put('/UserLogin/', data, {params: {idLoginCliente}});
      pegarIdTelefone();
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  }

  async function pegarIdTelefone() {
    try {
      const response = await api.get('/UserPhone/', {params: {idCliente}});
      const data = response.data.response;

      data.map(item => {
        idFoneCliente = item.idFoneCliente;
      });
      atualizarTelefone();
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  }

  async function atualizarTelefone() {
    const data = {
      numFoneCliente: telefoneCliente,
    };
    try {
      await api.put('/UserPhone/', data, {params: {idFoneCliente}});
      atualizarDados();
    } catch (error) {
      setShowLoader(false);
      alert(error);
    }
  }

  async function atualizarDados() {
    try {
      await AsyncStorage.setItem('nomeCliente', nomeCliente);
      await AsyncStorage.setItem('CPF', cpfCliente);
      await AsyncStorage.setItem('emailCliente', emailCliente);
      await AsyncStorage.setItem('senhaCliente', senhaCliente);
      await AsyncStorage.setItem('telefoneCliente', telefoneCliente);
      setShowLoader(false);
      setModalTwo(true);
    } catch (error) {
      console.log(error);
    }
  }

  function voltar() {
    setModalTwo(false);
    setTimeout(() => navigation.goBack(), 200);
  }

  return (
    <>
      <StatusBar backgroundColor="white" />
      <Header text="Editar Perfil" navigation={navigation} />
      <ScrollView style={styles.fundo}>
        <View style={styles.banner}>
          <View
            style={{
              backgroundColor: '#23AFDB',
              width: '100%',
              height: '60%',
              alignItems: 'center',
            }}>
            <View style={styles.imgPerfil}>
              {!showLoader && <Text style={styles.txtInicial}>{inicial}</Text>
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
          {/**
                    <View style={{width:'100%', height:'20%',}}>
                        <TouchableOpacity style={styles.imgPerfilTouch}>
                            <Icons name='camera' size={20} color="white" style={{padding: 6}}></Icons>
                        </TouchableOpacity> 
                    </View>
                     */}
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback>
              <Icons style={styles.icon} name="user" size={18} color="#333" />
            </TouchableWithoutFeedback>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666"
              placeholder="Nome"
              returnKeyType="next"
              autoCapitalize="words"
              //keyboardType="default"
              blurOnSubmit={false}
              onChangeText={nomeCliente => setNomeCliente(nomeCliente)}
              onSubmitEditing={() => this.input2.focus()}
              value={nomeCliente}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback>
              <Icons
                style={styles.icon}
                name="clipboard"
                size={18}
                color="#333"
              />
            </TouchableWithoutFeedback>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666"
              placeholder="CPF"
              returnKeyType="next"
              keyboardType="numeric"
              blurOnSubmit={false}
              onChangeText={cpfCliente => setCpfCliente(cpfCliente)}
              ref={input => {
                this.input2 = input;
              }}
              onSubmitEditing={() => this.input3.focus()}
              value={cpfCliente}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback>
              <Icons
                style={styles.icon}
                name="smartphone"
                size={18}
                color="#333"
              />
            </TouchableWithoutFeedback>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666"
              placeholder="Telefone"
              returnKeyType="next"
              keyboardType="numeric"
              blurOnSubmit={false}
              onChangeText={telefoneCliente =>
                setTelefoneCliente(telefoneCliente)
              }
              ref={input => {
                this.input3 = input;
              }}
              onSubmitEditing={() => this.input4.focus()}
              value={telefoneCliente}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback>
              <Icons style={styles.icon} name="mail" size={18} color="#333" />
            </TouchableWithoutFeedback>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666"
              placeholder="Email"
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="email-address"
              blurOnSubmit={false}
              onChangeText={emailCliente => setEmailCliente(emailCliente)}
              ref={input => {
                this.input4 = input;
              }}
              onSubmitEditing={() => this.input5.focus()}
              value={emailCliente}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback>
              <Icons style={styles.icon} name="lock" size={18} color="#333" />
            </TouchableWithoutFeedback>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666"
              placeholder="Senha"
              returnKeyType="done"
              autoCapitalize="none"
              secureTextEntry={false}
              blurOnSubmit={false}
              onChangeText={senhaCliente => setSenhaCliente(senhaCliente)}
              ref={input => {
                this.input5 = input;
              }}
              onSubmitEditing={atualizarUsuario}
              value={senhaCliente}
            />
          </View>

          <View style={styles.bt}>
            <TouchableOpacity onPress={atualizarUsuario}>
              <View style={styles.btLogar}>
                {!showLoader && <Text style={styles.txtLogin}>Salvar</Text>}

                {showLoader && (
                  <ActivityIndicator
                    animating={showLoader}
                    size="small"
                    color="white"
                  />
                )}
              </View>
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
                {`${
                  nomeCliente.length >= 8 && nomeCliente.search(' ') != -1
                    ? ';)'
                    : ' - Nome inválido, insira nome e sobrenome, Ex: Maria Silva.'
                }`}
              </Text>
              <Text style={styles.AvisoTxt2}>
                {`${
                  validaCPF(cpfCliente)
                    ? ':)'
                    : ' - CPF inválido, insira um CPF sem pontuções, Ex: 12345678912.'
                }`}
              </Text>
              <Text style={styles.AvisoTxt2}>
                {`${
                  telefoneCliente.length === 11
                    ? ';)'
                    : ' - Telefone inválido, insira o numero com o DDD sem pontuação, Ex: 1112345678.'
                }`}
              </Text>
              <Text style={styles.AvisoTxt2}>
                {`${
                  validaEmail(emailCliente)
                    ? ':)'
                    : ' - E-mail inválido, verifique-o.'
                }`}
              </Text>
              <Text style={styles.AvisoTxt2}>
                {`${
                  validaSenha(senhaCliente)
                    ? ';)'
                    : ' - Senha inválida, utilize uma senha com no minímo 8 digitos, sem espaços em branco.'
                }`}
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
                Perfil atualizado com sucesso ;)
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: 'white',
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

  imgPerfilTouch: {
    alignContent: 'center',
    marginLeft: '55%',
    marginTop: '5%',
    width: 33,
    height: 33,
    borderRadius: 30,
    backgroundColor: '#23AFDB',
  },

  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*
    input:{
        width: '85%', 
    },
    */
  bt: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 20,
  },

  txtLogin: {
    fontFamily: 'arial',
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },

  btLogar: {
    justifyContent: 'center',
    backgroundColor: '#23AFDB',
    height: 42,
    width: 190,
    borderRadius: 50,
  },

  inputContainer: {
    width: '85%',
    borderColor: 'rgba(70,70,70, 0.31)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 25,
    flexDirection: 'row',
  },

  icon: {
    alignSelf: 'center',
    paddingRight: 20,
    marginLeft: 10,
    color: 'rgba(0,0,0,0.7)',
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
    textAlign: 'center',
  },
});
