import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, Image, Alert} from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import gifTriste from '../../../assets/imgs/gifTriste2.gif';
import Remedio from '../../../assets/imgs/remedio.png';
import Produto from '../../../assets/imgs/cosmeticos.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../componentes/Header';
import Modal from 'react-native-modal';

export default function Pedido() {
  const navigation = useNavigation();
  const [quant, setQuant] = useState(1);
  const [idCliente, setIdCliente] = useState();
  const [logCliente, setLogCliente] = useState();
  const [numLogCliente, setNumLogCliente] = useState();
  const [tem, setTem] = useState(false);
  const [status, setStatus] = useState(false);
  const [idProduto, setIdProduto] = useState();
  const [precoProd, setPrecoProduto] = useState();
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState();
  const [descProduct, setDescProduct] = useState();
  const [descDosagem, setDescDosagem] = useState();
  const [tipoDosagem, setTipoDosagem] = useState();
  const [taxaEntrega, setTaxaDeEntregaEstabelecimento] = useState();
  const [idEstabelecimento, setIdEstabelecimento] = useState();
  const [nomeEstabelecimento, setNomeEstabeleciemnto] = useState();
  const [tipoProduto, setTipoProduto] = useState();
  const [formaDePagamento, setFormaDePagamento] = useState('');
  const [formaDePagamentoTxt, setFormaDePagamentoTxt] = useState('');
  const [cupom, setCupom] = useState('');
  const [idCupom, setIdCupom] = useState('null');
  const [valorCupom, setValorCupom] = useState(null);
  const [valorDesconto, setValorDesconto] = useState(0);
  const [statusVenda, setStatusVenda] = useState(2);
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [img, setImg] = useState();
  const route = useRoute();

  var data = new Date();
  var ano = data.getFullYear();
  var mes = data.getMonth()+1;
  var dia = data.getDay()+12;
  var dataVenda = ano+'-'+mes+'-'+dia;
  var horaVenda = data.getHours()-3 + ':' + data.getMinutes() + ':' + data.getSeconds();

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

  function pegaProd() {
    try {
      setIdProduto(route.params.idProduto);
      setTipoProduto(route.params.tipoProduto);
      setPrecoProduto(route.params.precoProduto);
      setNomeEstabeleciemnto(route.params.nomeEstabelecimento);
      setTaxaDeEntregaEstabelecimento(route.params.taxaDeEntregaEstabelecimento);
      setDescProduct(route.params.descProduto);
      setDescDosagem(route.params.descDosagem);
      setTipoDosagem(route.params.tipoDose);
      setIdEstabelecimento(route.params.idEstabelecimento);
      setIdCupom(route.params.idCupom);
      setCupom(route.params.cupom);
      setValorCupom(route.params.valorCupom);
      setFormaDePagamento(route.params.idFormaPagamento);
      setFormaDePagamentoTxt(route.params.formaPagamento);
      setStatus(true);
      if(tipoProduto == 'Produto'){
        setImg(Produto);
      }else if(tipoProduto == 'Medicamento'){
        setImg(Remedio);
      }
    } catch (error) {
      setStatus(false);
      console.log(error);
    }
  }

  function attQuant() {
    setSubtotal(quant * parseFloat(precoProd));
    if (valorCupom != null) {
      setValorDesconto(
        (parseFloat(subTotal) + parseFloat(taxaEntrega)) *
          parseFloat(valorCupom / 100),
      );
      setTotal(parseFloat(subTotal) + parseFloat(taxaEntrega) - valorDesconto);
    } else {
      setTotal(parseFloat(subTotal) + parseFloat(taxaEntrega));
    }
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
    navigation.navigate('Cupom');
    //navigation.navigate('Home', {screen: 'Home'});
  }

  function navigateToEnderecos() {
    navigation.navigate('Enderecos');
  }

  function navigateToCupom(idCliente) {
    navigation.navigate('CadastrarCupom', {idCliente});
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
      console.log(error);
    }
  }

  async function pegarIdCliente() {
    const idCliente = await AsyncStorage.getItem('idCliente');
    setIdCliente(idCliente);
  }

  async function verificaCupom() {
    if (idCupom > 0) {
      const data = {
        idcliente: idCliente,
        idcupom: idCupom,
      };
      await api.post('/CuponsCliente/', data);
      realizarPedido();
    } else {
      realizarPedido();
    }
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
        idEstabelecimento: idEstabelecimento,
        idCupom: idCupom,
        taxaEntrega: taxaEntrega,
        idProduto: idProduto,
        idMedicamento: 'null',
        idFormaPagamento: formaDePagamento,
        idStatusVenda: statusVenda,
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
        idEstabelecimento: idEstabelecimento,
        idCupom: idCupom,
        taxaEntrega: taxaEntrega,
        idMedicamento: idProduto,
        idFormaPagamento: formaDePagamento,
        idProduto: 'null',
        idStatusVenda: statusVenda,
        qtdProduto: quant,
      };
    }

    try {
      await api.post('/Venda/', dataPedido);
      setIdProduto(null);
      setModalTwo(true);
    } catch (error) {
      setModal(true);
      console.log(error);
    }
  }

  function navigateToHome() {
    setModalTwo(false);
    setTimeout(() => navigation.navigate('Home', {screen: 'Home'}), 200);
  }

  return (
    <>
      <Header text="Pedido"/>
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
              <Image source={img} style={styles.imgProd} />
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
            <Text style={styles.subTitle}>Cupom de desconto:</Text>
            <Text style={styles.subTitleMaiorBold}>Total:</Text>
            <Text style={styles.cont}>R${subTotal},00</Text>
            <Text style={styles.cont}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(taxaEntrega)}
            </Text>
            {valorCupom != null && (
              <Text style={styles.cont}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(valorDesconto)}
              </Text>
            )}
            {valorCupom == null && <Text style={styles.cont}>R$0,00</Text>}
            <Text style={styles.cont}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)}
            </Text>
          </View>

          <TouchableNativeFeedback
            onPress={() => navigateToCupom(idCliente)}
            style={styles.contCupom}>
            <IconComunity name="cards-outline" size={28} color="#23AFDB" />
            <View style={styles.dadosCupom}>
              <Text>
                <Text style={styles.subTitleBold}>Cupom: </Text>
                <Text style={styles.subTitlePgto}>{cupom}</Text>
              </Text>
              <Text style={styles.cont}>Inserir cupom</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} color="#23AFDB" />
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={navigateToPagamento}
            style={styles.contPagto}>
            <IconFeather name="credit-card" size={26} color="#23AFDB" />
            <View style={styles.dadosPagto}>
              <Text>
                <Text style={styles.subTitleBold}>Pagamento:</Text>{' '}
                <Text style={styles.subTitlePgto}>{formaDePagamentoTxt}</Text>
              </Text>
              <Text style={styles.cont}>Formas de pagamento</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} color="#23AFDB" />
          </TouchableNativeFeedback>

          <TouchableOpacity style={styles.btPedir} onPress={verificaCupom}>
            <Text style={styles.btText}>Pedir</Text>
          </TouchableOpacity>
        </View>
      )}

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
                Não foi realizar o pedido, verifique os dados e tente novamente
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
          onSwipeComplete={() => navigateToHome()}
          swipeDirection={['down']}
          animationIn="zoomIn"
          animationInTiming={300}
          animationOutTiming={300}>
          <View style={styles.Modal}>
            <Text style={styles.OpsTxt}>Hey!</Text>
            <View style={styles.AvisoModal}>
              <Text style={styles.AvisoTxt}>
                Compra realizada com sucesso ;)
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
