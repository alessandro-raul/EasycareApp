import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Header from '../../componentes/HeaderBack';
import Remedio from '../../../assets/imgs/cosmeticos.png';
import api from '../../services/api';
import styles from './style';

export default function DetailProd() {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const nomeEstablishment = route.params.nomeEstabelecimento;
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [taxaDeEntregaEstabelecimento, setTaxaDeEntregaEstabelecimento] = useState();
  const [tipoProduto, setTipoProduto] = useState('Produto');
  const idCupom = "null";
  const valorCupom = 0;
  const cupom = "";
  var auxNome;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadDadosEstablishment(product.idEstabelecimento);
    });
    return unsubscribe;
  }, [navigation]);

  function navigateToEstabelecimento(idEstabelecimento) {
    navigation.navigate('PerfilEstabelecimento', {idEstabelecimento});
  }

  async function loadDadosEstablishment(idEstabelecimento) {
    const response = await api.get('/Establishment', {
      params: {idEstabelecimento},
    });
    var data = response.data.response;
    data.map(item => {
      setNomeEstabelecimento(item.nomeEstabelecimento);
      setTaxaDeEntregaEstabelecimento(item.taxaDeEntregaEstabelecimento);
    });
  }

  async function navigateToPedido(idProduto, descProduto, descDosagem, idEstabelecimento, nomeEstabelecimento, taxaDeEntregaEstabelecimento, precoProduto, tipoDose, tipoProduto, idCupom, valorCupom, cupom) {
    navigation.navigate('Pedido', {idProduto, descProduto, descDosagem, idEstabelecimento, nomeEstabelecimento, taxaDeEntregaEstabelecimento, precoProduto, tipoDose, tipoProduto, idCupom, valorCupom, cupom});
  }

  return (
    <>
      <Header text="Detalhes" />
      <View style={styles.container}>
        <View style={styles.contImg}>
          <Image source={Remedio} style={styles.imgMed} />
        </View>
        <View style={styles.descMed}>

          <View>
              <Text style={styles.title}>{product.descProduto}, {product.qtdMl} {product.tipoDosagem}</Text>
              <Text style={styles.precoMed}>{product.descProduto}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigateToEstabelecimento(product.idEstabelecimento)
              }>
              <Text style={styles.descFarma}>
                Vendido por
                <Text style={styles.nameFarm}> {nomeEstabelecimento}</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.precoPromo}>
              {Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL'
            }).format(product.precoProduto)}
              
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigateToPedido(product.idProduto, product.descProduto, product.qtdMl, product.idEstabelecimento, nomeEstabelecimento, taxaDeEntregaEstabelecimento, product.precoProduto, product.tipoDosagem, tipoProduto, idCupom, valorCupom, cupom)}
          style={styles.btComprar}>
          <Text style={styles.textBtComprar}>Comprar</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity style={styles.btAdd}>
          <Text style={styles.textBtAdd}>Adicionar ao pedido</Text>
          </TouchableOpacity>*/}
      </View>
    </>
  );
}
