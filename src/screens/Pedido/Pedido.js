import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, Image, Alert} from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import gifTriste from '../../../assets/imgs/gifTriste2.gif';
import Remedio from '../../../assets/imgs/remedio.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Cupom from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../componentes/Header';

export default function Pedido() {
  const navigation = useNavigation();
  const [quant, setQuant] = useState(1);
  const [idCliente, setIdCliente] = useState();
  const [logCliente, setLogCliente] = useState();
  const [numLogCliente, setNumLogCliente] = useState();
  const [statusEnd, setStatusEnd] = useState(true);
  const [tem, setTem] = useState(true);
  const [status, setStatus] = useState(false);
  const [idProduto, setIdProduto] = useState(false);
  const [precoProd, setPrecoProduto] = useState();
  const [subTotal, setSubtotal] = useState();
  const [total, setTotal] = useState();
  const [descProduct, setDescProduct] = useState();
  const [descDosagem, setDescDosagem] = useState();
  const [tipoDosagem, setTipoDosagem] = useState();
  const [taxaEntrega, setTaxaDeEntregaEstabelecimento] = useState();
  const [nomeEstabelecimento, setNomeEstabeleciemnto] = useState();
  const [idEnderecoCliente, setIdEnderecoCliente] = useState();
  const [tipoProduto, setTipoProduto] = useState();
  const [formaDePagamento, setFormaDePagamento] = useState('');
  const [statusVenda, setStatusVenda] = useState('Ativa');
  const route = useRoute();

  var data = new Date();
  var dataVenda = data.getFullYear()+'/'+data.getMonth()+'/'+data.getDay();
  var horaVenda = data.getHours()-3+':'+data.getMinutes()+':'+data.getSeconds(); 
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pegarIdEndereco();
      pegarIdCliente();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    pegaProd();
    attQuant();
  });

  useEffect(() => {
    setTotal(parseFloat(subTotal) + parseFloat(taxaEntrega));
  }, [quant]);

  function pegaProd(){
    try {
      setIdProduto(route.params.idProduto);
      setTipoProduto(route.params.tipoProduto);
      setPrecoProduto(route.params.precoProduto);
      setNomeEstabeleciemnto(route.params.nomeEstabelecimento);
      setTaxaDeEntregaEstabelecimento(route.params.taxaDeEntregaEstabelecimento);
      setDescProduct(route.params.nomeProduto);
      setDescDosagem(route.params.descDosagem);
      setTipoDosagem(route.params.tipoDose);
      setFormaDePagamento(route.params.formaDePagamento);
      setStatus(true);
      console.log(formaDePagamento);
    } catch (error) {
      console.log(error);
    }
  }

  function attQuant() {
    setSubtotal(quant * parseFloat(precoProd));
    setTotal(parseFloat(subTotal) + parseFloat(taxaEntrega));
  }

  function addQuant() {
    if (quant < 10) {
      setQuant(quant + 1);
      setSubtotal(quant * parseFloat(precoProd));
    }
  }

  function removeQuant() {
    if (quant > 0) {
      setQuant(quant - 1);
      setSubtotal(quant * parseFloat(precoProd));
    }
  }

  function navigateToHome() {
    navigation.navigate('Home', {screen: 'Home'});
  }

  function navigateToEnderecos() {
    navigation.navigate('Enderecos');
  }

  function navigateToCupom() {
    navigation.navigate('Cupom');
  }

  function navigateToPagamento() {
    navigation.navigate('Pagamento');
  }

  async function pegarIdEndereco() {
    try {
      idd = await AsyncStorage.getItem('idEnderecoCliente');
      //setIdEnderecoCliente(idd);
      pegarEndereco();
    } catch (error) {
      //console.log(error);
    }
  }

  async function pegarEndereco() {
    try {
      const response = await api.get('/UserAdress/', {
        params: {idEnderecoCliente: idd},
      });
      const data = response.data.response;
      console.log(idd);
      if (data == 'Nenhum usuário encontrado' || data == undefined) {
        setTem(false);
      } else {
        setTem(true);
      }
      data.map(item => {
        setLogCliente(item.logCliente);
        setNumLogCliente(item.numLogCliente);
      });
    } catch (error) {
      //console.log(error);
    }
  }

  async function pegarIdCliente() {
    const idCliente = await AsyncStorage.getItem('idCliente');
    setIdCliente(idCliente);
  }

  async function realizarPedido() {
    var dataPedido = {};
    if (tipoProduto == 'Produto') {
      dataPedido = {
        dataVenda: dataVenda,
        horaVenda: horaVenda,
        subTotalVenda: subTotal,
        totalVenda: total,
        observacaoVenda: 'null',
        idCliente: idCliente,
        idEnderecoCliente: idd,
        idCupom: 'null',
        precoFrete: taxaEntrega,
        idProduto: idProduto,
        idMedicamento: 'null',
        formaDePagamento : formaDePagamento,
        statusVenda: statusVenda,
        qtdProduto: quant,
      };
    } else if (tipoProduto == 'Medicamento') {
      dataPedido = {
        dataVenda: dataVenda,
        horaVenda: horaVenda,
        subTotalVenda: subTotal,
        totalVenda: total,
        observacaoVenda: 'null',
        idCliente: idCliente,
        idEnderecoCliente: idd,
        idCupom: 'null',
        precoFrete: taxaEntrega,
        idMedicamento: idProduto,
        formaDePagamento : formaDePagamento,
        idProduto: 'null',
        statusVenda: statusVenda,
        qtdProduto: quant,
      };
    }
    try {
      await api.post('/Venda/', dataPedido);
      Alert.alert(
        'Easycare',
        'Compra realizada com sucesso!',
        [{text: 'OK', onPress: () => navigateToHome()}],
        {cancelable: false},
      );
    } catch (error) {
      alert(error);
    }
  }

  function navigateToHome() {
    navigation.navigate('Home', {screen: 'Home'});
  }

  return (
    <>
      <Header text="Pedido" />
      {!status && (
        <View style={styles.container2}>
          <Text style={styles.nlTxt}>
            Você ainda não iniciou nenhum pedido...
          </Text>
          <Image source={gifTriste} style={styles.gif} />
          <TouchableOpacity style={styles.btLogar} onPress={navigateToHome}>
            <Text style={styles.txtLogar}>Comprar agora!</Text>
          </TouchableOpacity>
        </View>
      )}

      {status && (
        <View style={styles.container}>
          <TouchableNativeFeedback
            onPress={navigateToEnderecos}
            style={styles.contEntrega}>
            <View style={styles.icons}>
              <IconFeather name="map-pin" size={28} color="#23AFDB" />
            </View>
            <View style={styles.local}>
              <Text style={styles.subTitleBold}>Entregar em:</Text>

              {tem && (
                <Text style={styles.cont}>
                  {logCliente}, {numLogCliente}
                </Text>
              )}

              {!tem && <Text style={styles.cont}>Selecione um endereço</Text>}
            </View>
            <Icon name="keyboard-arrow-right" size={32} color="#23AFDB" />
          </TouchableNativeFeedback>

          <View style={styles.contProd}>
            <View>
              <Image source={Remedio} style={styles.imgProd} />
            </View>
            <View style={styles.dadosProd}>
              <Text style={styles.subTitle}>
                {descProduct}, {descDosagem} {tipoDosagem}
              </Text>
              <View style={styles.dadosFarma}>
                <Text style={styles.contMenor}>Vendido por </Text>
                <Text style={{fontWeight: '700'}}>{nomeEstabelecimento}</Text>
              </View>
              <View style={styles.quant}>
                <Text style={styles.subTitleBold}>Quantidade:</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={() => removeQuant()}>
                    <Icon name="remove" size={24} color="#23AFDB" />
                  </TouchableOpacity>
                  <Text style={styles.cont}>{quant}</Text>
                  <TouchableOpacity onPress={() => addQuant()}>
                    <Icon name="add" size={24} color="#23AFDB" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.contPedido}>
            <Text style={styles.subTitle}>Subtotal:</Text>
            <Text style={styles.subTitle}>Frete:</Text>
            <Text style={styles.subTitleMaiorBold}>Total:</Text>
            <Text style={styles.cont}>R$ {subTotal},00</Text>
            <Text style={styles.cont}>R$ {taxaEntrega},00</Text>
            <Text style={styles.cont}>R$ {total},00</Text>
          </View>

          <TouchableNativeFeedback
            onPress={navigateToCupom}
            style={styles.contCupom}>
            <IconComunity name="cards-outline" size={28} color="#23AFDB" />
            <View style={styles.dadosCupom}>
              <Text style={styles.subTitleBold}>Cupom:</Text>
              <Text style={styles.cont}>Inserir cupom</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} color="#23AFDB" />
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={navigateToPagamento}
            style={styles.contPagto}>
            <IconFeather name="credit-card" size={26} color="#23AFDB" />
            <View style={styles.dadosPagto}>
              <Text><Text style={styles.subTitleBold}>Pagamento:</Text> <Text style={styles.subTitlePgto}>{formaDePagamento}</Text></Text>
              <Text style={styles.cont}>Formas de pagamento</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} color="#23AFDB" />
          </TouchableNativeFeedback>

          <TouchableOpacity
            style={styles.btPedir}
            onPress={() => realizarPedido()}>
            <Text style={styles.btText}>Pedir</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
