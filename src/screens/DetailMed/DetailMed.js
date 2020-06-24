import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Header from '../../componentes/HeaderBack';
import Remedio from '../../../assets/imgs/remedio.png';
import api from '../../services/api';
import styles from './style';

export default function DetailMed() {
  const navigation = useNavigation();
  const route = useRoute();
  const medicament = route.params.medicament;
  const nomeEstablishment = route.params.nomeEstabelecimento;
  var auxNome;
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [
    taxaDeEntregaEstabelecimento,
    setTaxaDeEntregaEstabelecimento,
  ] = useState();
  const [tipoProduto, setTipoProduto] = useState('Medicamento');
  const idCupom = 'null';
  const valorCupom = 0;
  const cupom = '';

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadDadosEstablishment(medicament.idEstabelecimento);
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

  async function navigateToPedido(
    idProduto,
    nomeProduto,
    descDosagem,
    idEstabelecimento,
    nomeEstabelecimento,
    taxaDeEntregaEstabelecimento,
    precoProduto,
    tipoDose,
    tipoProduto,
    idCupom,
    valorCupom,
    cupom,
  ) {
    navigation.navigate('Pedido', {
      idProduto,
      nomeProduto,
      descDosagem,
      idEstabelecimento,
      nomeEstabelecimento,
      taxaDeEntregaEstabelecimento,
      precoProduto,
      tipoDose,
      tipoProduto,
      idCupom,
      valorCupom,
      cupom,
    });
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
            <Text style={styles.title}>
              {medicament.descMed}, {medicament.descDosagem}{' '}
              {medicament.tipoDosagem}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigateToEstabelecimento(medicament.idEstabelecimento)
              }>
              <Text style={styles.descFarma}>
                Vendido por
                <Text style={styles.nameFarm}> {nomeEstabelecimento}</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.precoMed}>R$ 20,00</Text>
            <Text style={styles.precoPromo}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(medicament.precoMed)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigateToPedido(
              medicament.idMedicamento,
              medicament.descMed,
              medicament.descDosagem,
              medicament.idEstabelecimento,
              nomeEstabelecimento,
              taxaDeEntregaEstabelecimento,
              medicament.precoMed,
              medicament.tipoDosagem,
              tipoProduto,
              idCupom,
            )
          }
          style={styles.btComprar}>
          <Text style={styles.textBtComprar}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btAdd}>
          <Text style={styles.textBtAdd}>Adicionar ao pedido</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
