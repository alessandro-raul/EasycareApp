import React, { useState, useEffect } from 'react';
import { View, Text, Image,TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import Header from '../../componentes/Header';
import logo from '../../../assets/imgs/drogariasp.png';
import Remedio from '../../../assets/imgs/remedio.png';
import SearchBarHome from '../../componentes/SearchBarHome';
import api from '../../services/api';
import styles from './style';
import style from './style';

  
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
    <Header text="Easycare" />
    <View style={styles.container}>
    <View style={styles.viewLogoFarma}>
      <Image style={styles.logoFarma} source={logo}/>
    </View>
    <View style={styles.infosFarma}>
      <View style={styles.nomeFarmaView}>
        <Text style={styles.nomeFarmaTxt}>{nomeEstabelecimento} - {bairroLogEstabelecimento}</Text>
        <TouchableOpacity style={styles.btMais}>
            <Icon name='navigate-next' size={35} color="#23AFDB" />
        </TouchableOpacity>
      </View>
      <SearchBarHome/>
      <View style={styles.taxaEntregaView}>
        <IconAwesome name='motorcycle' size={20} color="#23AFDB" />
        <Text style={styles.taxaEntregaTxt}>Taxa de entrega = R$5,00</Text>
      </View>
      
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
    </>
  )  
}