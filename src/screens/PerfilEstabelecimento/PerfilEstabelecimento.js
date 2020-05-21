import React, { useState, useEffect } from 'react';
import { View, Text, Image,TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import MeuHeader from '../../componentes/Header';
import logo from '../../../assets/imgs/drogariasp.png';
import Drogaria from '../../../assets/imgs/drogariasp.png';
import Remedio from '../../../assets/imgs/remedio.png';
import SearchBarHome from '../../componentes/SearchBarHome';
import api from '../../services/api';
import styles from './style';
import HeaderScroll from '../../componentes/HeaderScroll';
import style from './style';
import {Container, Header, Content, Tab, Tabs } from 'native-base';

  
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

  function navigateToDetailEstabelecimento(idEstabelecimento, nomeEstabelecimento, cnpjEstabelecimento, logEstabelecimento, numLogEstabelecimento, bairroLogEstabelecimento, cidadeLogEstabelecimento, ufLogEstabelecimento, cepLogEstabelecimento) {
    navigation.navigate('DetailEstabelecimento', { idEstabelecimento, nomeEstabelecimento, cnpjEstabelecimento, logEstabelecimento, numLogEstabelecimento, bairroLogEstabelecimento, cidadeLogEstabelecimento, ufLogEstabelecimento, cepLogEstabelecimento });
  }

  async function loadMedicaments(idEstabelecimento) {
    const response = await api.get('/Medicament', { params: {idEstabelecimento,
                                 } });
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
    <MeuHeader text={nomeEstabelecimento}/>
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.viewLogoFarma}>
      <Image style={styles.logoFarma} source={logo}/>
    </View>
    <View style={styles.infosFarma}>
      <View style={styles.nomeFarmaView}>
        <Text style={styles.nomeFarmaTxt}>{nomeEstabelecimento} - {bairroLogEstabelecimento}</Text>
        <TouchableOpacity style={styles.btMais} onPress={()=>navigateToDetailEstabelecimento(idEstabelecimento, nomeEstabelecimento, cnpjEstabelecimento, logEstabelecimento, numLogEstabelecimento, bairroLogEstabelecimento, cidadeLogEstabelecimento, ufLogEstabelecimento, cepLogEstabelecimento)}>
            <Icon name='navigate-next' size={35} color="#23AFDB" />
        </TouchableOpacity>
      </View>
      <SearchBarHome/>
      <View style={styles.taxaEntregaView}>
        <IconAwesome name='motorcycle' size={18} color="#23AFDB" />
        <Text style={styles.taxaEntregaTxt}>Taxa de entrega = R$5,00</Text>
      </View>
    </View>

    <Tabs tabStyle={{backgroundColor: 'white', borderWidth: 0}} tabBarPosition='top' locked={true} tabBarUnderlineStyle={{backgroundColor: '#23AFDB'}} initialPage={0}>
              <Tab heading="Medicamentos" textStyle={{color: 'gray'}} activeTextStyle={{color: '#23AFDB'}}  activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}}>
                <View style={[ styles.containerTab, { backgroundColor: '#fff' } ]}>
                  <View style={styles.contScroll}>
                    <HeaderScroll title="Ofertas" icon="arrow-forward" size={26} />                     
                    <FlatList
                      data={medicaments}
                      initialNumToRender
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={medicament => String(medicament.idMedicamento)}
                      style={styles.scrollMedic}
                      renderItem={({ item:medicament }) => (
                      <TouchableOpacity onPress={() => navigateToDetailMed(medicament)} style={styles.medicContainer}>
                        <View style={styles.contImg}>
                            <Image source={Remedio} style={styles.imgMedic} />
                        </View>
                        <View style={styles.contDesc}>
                           
                        <View style={styles.descMedic}>
                            <Text style={styles.nameMedic}>{medicament.descMed}</Text>
                            <Text style={styles.precoMedic}>R$ {medicament.precoMed},00
                            </Text>       
                          </View>
                        </View>
                      </TouchableOpacity>
                      )}
                      /> 
                  </View>   
                  <View style={styles.contScroll}>
                    <HeaderScroll title="Mais vendidos" icon="arrow-forward" size={26} />                     
                    <FlatList
                      data={medicaments}
                      initialNumToRender
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={medicament => String(medicament.idMedicamento)}
                      style={styles.scrollMedic}
                      renderItem={({ item:medicament }) => (
                      <TouchableOpacity onPress={() => navigateToDetailMed(medicament)} style={styles.medicContainer}>
                        <View style={styles.contImg}>
                            <Image source={Remedio} style={styles.imgMedic} />
                        </View>
                        <View style={styles.contDesc}>
                           
                        <View style={styles.descMedic}>
                            <Text style={styles.nameMedic}>{medicament.descMed}</Text>
                            <Text style={styles.precoMedic}>R$ {medicament.precoMed},00
                            </Text>       
                          </View>
                        </View>
                      </TouchableOpacity>
                      )}
                      /> 
                  </View> 

                  <View style={styles.contScroll}>
                    <HeaderScroll title="Mais vendidos" icon="arrow-forward" size={26} />                     
                    <FlatList
                      data={medicaments}
                      initialNumToRender
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={medicament => String(medicament.idMedicamento)}
                      style={styles.scrollMedic}
                      renderItem={({ item:medicament }) => (
                      <TouchableOpacity onPress={() => navigateToDetailMed(medicament)} style={styles.medicContainer}>
                        <View style={styles.contImg}>
                            <Image source={Remedio} style={styles.imgMedic} />
                        </View>
                        <View style={styles.contDesc}>
                           
                        <View style={styles.descMedic}>
                            <Text style={styles.nameMedic}>{medicament.descMed}</Text>
                            <Text style={styles.precoMedic}>R$ {medicament.precoMed},00
                            </Text>       
                          </View>
                        </View>
                      </TouchableOpacity>
                      )}
                      /> 
                  </View> 
                
                </View>
                
              </Tab>
              <Tab heading="Outros" textStyle={{color: 'gray'}} activeTextStyle={{color: '#23AFDB'}}  activeTabStyle={{backgroundColor: 'white'}} tabStyle={{backgroundColor: 'white'}}>
                <View style={[ styles.containerTab, { backgroundColor: '#fff' } ]}>
                      <Text>Outros produtos</Text>  
                </View>
              </Tab>
            </Tabs>
    </View>
    </ScrollView>
    </>
  )  
}