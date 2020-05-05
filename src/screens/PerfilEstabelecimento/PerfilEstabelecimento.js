import React, { useState, useEffect } from 'react';
import { View, Text, Image,TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../componentes/Header';

import Banner from '../../../assets/imgs/drogariaspbanner.png';
import Remedio from '../../../assets/imgs/remedio.png';

import api from '../../services/api';
import styles from './style';

  
export default function PerfilEstabelecimento({navigation}) {
  navigation = useNavigation();
  const route = useRoute();

  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [cnpjEstabelecimento, setCnpjEstabelecimento] = useState(0);
  const [logEstabelecimento, setLogEstabelecimento] = useState(0);
  const [numLogEstabelecimento, setNumLogEstabelecimento] = useState(0);
  const [cepLogEstabelecimento, setCepLogEstabelecimento] = useState(0);
  const [bairroLogEstabelecimento, setBairroLogEstabelecimento] = useState('');
  const [cidadeLogEstabelecimento, setCidadeLogEstabelecimento] = useState('');
  const [ufLogEstabelecimento, setUfLogEstabelecimento] = useState('');
  const [statusEstabelecimento, setStatusEstabelecimento] = useState('');

  const [medicaments, setMedicaments] = useState([]);

  const idEstabelecimento = route.params.idEstabelecimento;

  async function loadDadosEstablishment(idEstabelecimento) {
    const response = await api.get('/Establishment', { params: {idEstabelecimento} });
    var data = response.data.response;
    data.map(item =>{
      setNomeEstabelecimento(item.nomeEstabelecimento);
      setCnpjEstabelecimento(item.cnpjEstabelecimento);
      setLogEstabelecimento(item.logEstabelecimento);
      setNumLogEstabelecimento(item.numLogEstabelecimento);
      setCepLogEstabelecimento(item.cepLogEstabelecimento);
      setBairroLogEstabelecimento(item.bairroLogEstabelecimento);
      setCidadeLogEstabelecimento(item.cidadeLogEstabelecimento);
      setUfLogEstabelecimento(item.ufLogEstabelecimento);
      setStatusEstabelecimento(item.statusEstabelecimento);
    });

    loadMedicaments(idEstabelecimento);

  }

  async function loadMedicaments(idEstabelecimento) {
    const response = await api.get('/Medicament', { params: {idEstabelecimento} });
    const data = response.data.response;
    setMedicaments(data);
   
  }

  function navigateToDetailMed(medicament, nomeEstabelecimento) {
    console.log(medicament);
    navigation.navigate('DetailMed', { medicament, nomeEstabelecimento })
  }

  useEffect(() => {
    loadDadosEstablishment(idEstabelecimento);
  }, []);


  return(
    <>
    <Header text="Drogaria SP" />
    <View style={styles.container}>
      <View style={styles.contBanner}>
        <Image style={styles.imgBanner} source={Banner}/>
      </View>
      <View style={styles.cont}>
        <View style={styles.infoFarm}>
          <Text style={styles.nameFarm}>{nomeEstabelecimento}</Text>
          <Text>//Filial, 42</Text>
          <Text>{logEstabelecimento}, N°{numLogEstabelecimento}</Text>
          <Text>{bairroLogEstabelecimento}, {cidadeLogEstabelecimento}</Text>
          <Text>Avaliação</Text>
          <TouchableOpacity style={styles.btLigar}>
            <Text style={styles.textBtLigar}>Ligar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contOferta}>
          <Text style={styles.subTitle}>Ofertas</Text>

          <View style={styles.contScroll}>
            <FlatList
             data={medicaments} 
             horizontal={true}
             showsHorizontalScrollIndicator={false}
             keyExtractor={medicament => String(medicament.idMedicamento)}
             style={styles.scroll}
             renderItem={({item:medicament}) => (
              
              <TouchableOpacity onPress={()=> navigateToDetailMed(medicament, nomeEstabelecimento)} style={styles.medContainer}>
                <Image source={Remedio} style={styles.imgMed}/>
                <View style={styles.contDesc}>
                  <Text style={styles.nameMed}>{medicament.descMed}</Text>
                  <Text style={styles.precoMed}>
                    {/*Intl.NumberFormat('pt-BR', {
                    style: 'currency', currency: 'BRL'
                    }).format(medicament.precoMed)*/}
                    R$ {medicament.precoMed},00
                  </Text>
                </View>
              </TouchableOpacity>

             )}
            /> 
          </View>
        </View>
      </View>
    </View>
    </>
  )  
}