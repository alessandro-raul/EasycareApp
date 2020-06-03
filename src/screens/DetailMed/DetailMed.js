import React, {useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
  /*
  const [cnpjEstabelecimento, setCnpjEstabelecimento] = useState(0);
  const [logEstabelecimento, setLogEstabelecimento] = useState(0);
  const [numLogEstabelecimento, setNumLogEstabelecimento] = useState(0);
  const [cepLogEstabelecimento, setCepLogEstabelecimento] = useState(0);
  const [bairroLogEstabelecimento, setBairroLogEstabelecimento] = useState('');
  const [cidadeLogEstabelecimento, setCidadeLogEstabelecimento] = useState('');
  const [ufLogEstabelecimento, setUfLogEstabelecimento] = useState('');
  const [statusEstabelecimento, setStatusEstabelecimento] = useState('');
  */

  function navigateToEstabelecimento(idEstabelecimento) {
    navigation.navigate('PerfilEstabelecimento', { idEstabelecimento });
  }

  async function loadDadosEstablishment(idEstabelecimento) {
    const response = await api.get('/Establishment', { params: {idEstabelecimento} });
    var data = response.data.response;
    data.map(item =>{
      setNomeEstabelecimento(item.nomeEstabelecimento);
      /*
      setCnpjEstabelecimento(item.cnpjEstabelecimento);
      setLogEstabelecimento(item.logEstabelecimento);
      setNumLogEstabelecimento(item.numLogEstabelecimento);
      setCepLogEstabelecimento(item.cepLogEstabelecimento);
      setBairroLogEstabelecimento(item.bairroLogEstabelecimento);
      setCidadeLogEstabelecimento(item.cidadeLogEstabelecimento);
      setUfLogEstabelecimento(item.ufLogEstabelecimento);
      setStatusEstabelecimento(item.statusEstabelecimento);
      */
    });
  }

  async function navigateToPedido(medicament, nomeEstabelecimento) {
      navigation.navigate('Pedido', { medicament, nomeEstabelecimento});
  }

  if(nomeEstablishment==null){
    loadDadosEstablishment(medicament.idEstabelecimento);
    auxNome = nomeEstabelecimento;
  }else{
    auxNome = nomeEstablishment;
  }
  
  return(
    <>
    <Header text="Detalhes"/>
    <View style={styles.container}>
      <View style={styles.contImg}>
        <Image source={Remedio} style={styles.imgMed}/>  
      </View>  
      <View style={styles.descMed}>
        <View>
          <Text style={styles.title}>{medicament.descMed}, {medicament.descDosagem}</Text>
          <TouchableOpacity onPress={() => navigateToEstabelecimento(medicament.idEstabelecimento)}>
          <Text style={styles.descFarma}>Vendido por  
          
          <Text style={styles.nameFarm}> {auxNome}</Text>
        
          </Text> 
          </TouchableOpacity>
        </View> 
        <View>
          <Text style={styles.precoMed}>R$ 20,00</Text>
          <Text style={styles.precoPromo}>
            {/*Intl.NumberFormat('pt-BR', {
            style: 'currency', currency: 'BRL'
            }).format(medicament.precoMed)*/}
            R$ {medicament.precoMed},00
          </Text> 
        </View> 
      </View>
      <TouchableOpacity onPress={() => navigateToPedido(medicament, nomeEstabelecimento)} style={styles.btComprar}>
        <Text style={styles.textBtComprar}>Comprar</Text>  
      </TouchableOpacity>
      <TouchableOpacity style={styles.btAdd}>
        <Text style={styles.textBtAdd}>Adicionar ao pedido</Text>  
      </TouchableOpacity>
    </View>
    </>
  )  
}