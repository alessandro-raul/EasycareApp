import React, { useState, useLayoutEffect } from 'react';
import Header from '../../componentes/Header';
import { Text, StatusBar, View, Image, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
import HeaderScroll from '../../componentes/HeaderScroll';
import Remedio from '../../../assets/imgs/remedio.png';
import Drogaria from '../../../assets/imgs/drogariasp.png';
import api from '../../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBarHome from '../../componentes/SearchBarHome';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function Home({ navigation }) {
  const [medicaments, setMedicaments] = useState([]);
  const [logCliente, setLogCliente] = useState();
  const [numLogCliente, setNumLogCliente] = useState();
  const [tem, setTem] = useState(false);
  const [estabelecimentos, setEstabelecimentos] = useState();  
  const todos = "true";
  var idd;
  var statusIntro;
  console.disableYellowBox = true;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    gerenciaIntroducao();
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pegarIdEndereco();
      loadMedicaments();  
      loadEstabelecimentos(); 
      setTimeout(() => setVisible(true),1000);
    });
    return unsubscribe;
  }, [navigation]);

  navigation = useNavigation(); 

  async function gerenciaIntroducao(){
    try {
      statusIntro = await AsyncStorage.getItem("statusIntro");
        if(statusIntro == null){
          navigateToIntro();
        }
    } catch (error) {
      console.log(error);
    }
  }

  function navigateToDetailMed(medicament) {
    navigation.navigate('DetailMed', { medicament });
  }

  function navigateToEstabelecimento(idEstabelecimento) {
    navigation.navigate('PerfilEstabelecimento', { idEstabelecimento });
  }

  function navigateToIntro() {
    navigation.navigate('Introducao');
  }

  function navigateToSearch() {
    navigation.navigate('Pesquisa');
  }

  function navigateToEnderecos() {
    navigation.navigate('Enderecos');
  }

  async function loadMedicaments() {
    const response = await api.get('/Medicament/', {params: {todos: todos}});
    const data = response.data.response;
    setMedicaments(data);
  }

  async function pegarIdEndereco(){
    try{
      idd = await AsyncStorage.getItem("idEnderecoCliente");
      if (idd != null || idd != undefined){ 
        pegarEndereco();
      } else {
        setTem(false);
      }
    }catch(error){
      console.log(error);
    }
  }

  async function pegarEndereco(){
    try{
      const response = await api.get('/UserAdress/', {params: {idEnderecoCliente : idd}});
      const data = response.data.response;

      if (data == "Nenhum usuário encontrado" || data== undefined){ 
        setTem(false);
      } else {
        setTem(true);
        data.map(item => {
          setLogCliente(item.logCliente);
          setNumLogCliente(item.numLogCliente);
        });   
      }
    }catch(error){
      console.log(error);
    } 
  }

  async function loadEstabelecimentos() {
    const response = await api.get('/Establishment');
    const data = response.data.response;
    setEstabelecimentos(data);
  }
  
  return(
    <>
      <StatusBar backgroundColor='white'/>
      <Header text="Easycare"/>
      <View style={styles.container}>   
        <ScrollView style={{height: '100%'}}>
          <TouchableOpacity onPress={navigateToEnderecos} style={styles.localizacao}>
              <Icon name='map-pin' size={22} color='#23AFDB'/>
              {tem &&
              <View style={styles.viewLocalizacao}>
              <Text style={styles.txtLocalizacao}>{logCliente}, {numLogCliente}</Text>
              </View>
              }

              {!tem &&
                <Text style={styles.txtLocalizacao}>Selecione um endereço</Text>
              }
          </TouchableOpacity>

          <View style={styles.contSearch}>
            <SearchBarHome press={() => navigateToSearch() }/>
          </View> 

          <View style={styles.contScroll}>
            <HeaderScroll title="Ofertas recentes" icon="arrow-right" size={26} />                     
            <FlatList
              data={medicaments}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={medicament => String(medicament.idMedicamento)}
              style={styles.scrollMedic}
              renderItem={({ item:medicament }) => (
                  <TouchableOpacity onPress={() => navigateToDetailMed(medicament)} style={styles.medicContainer}>
                    <View style={styles.contImg}>
                      <ShimmerPlaceHolder
                        style={styles.shimmerImg}
                        autoRun={true}
                        visible={visible}
                      >
                        <Image source={Remedio} style={styles.imgMedic} />
                      </ShimmerPlaceHolder>
                    </View>
                    <View style={styles.contDesc}>
                      <View style={styles.descMedic}>
                        <ShimmerPlaceHolder
                          style={styles.shimmerText}
                          autoRun={true}
                          visible={visible}
                        >
                          <Text style={styles.nameMedic}>{medicament.descMed}, {medicament.composicaoMed}</Text>
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                          style={styles.shimmerText}
                          autoRun={true}
                          visible={visible}
                        >
                          <Text style={styles.nameLab}>{medicament.nomeLaboratorio}</Text>
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                          style={styles.shimmerText}
                          autoRun={true}
                          visible={visible}
                        >
                          <Text style={styles.dosagemMedic}>{medicament.descDosagem}{medicament.tipoDosagem}</Text>
                        </ShimmerPlaceHolder>
                      </View>              
                      <View style={styles.dadosCompra}>
                        <ShimmerPlaceHolder
                          style={styles.shimmerImgFarma}
                          autoRun={true}
                          visible={visible}
                        >
                          <Image source={Drogaria} style={styles.imgFarma} />
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                          style={styles.shimmerPreco}
                          autoRun={true}
                          visible={visible}
                        >
                          <Text style={styles.precoMedic}>R$ {medicament.precoMed},00</Text>       
                        </ShimmerPlaceHolder>
                      </View>
                    </View>
                  </TouchableOpacity>
            )}
            /> 
          </View>

          <View style={styles.contScroll}>
            <HeaderScroll title="Comprados recentemente" icon="arrow-right" size={26} />                     
            <FlatList
              data={medicaments}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={medicament => String(medicament.idMedicamento)}
              style={styles.scrollMedic}
              renderItem={({ item:medicament }) => (
              <TouchableOpacity onPress={() => navigateToDetailMed(medicament)} style={styles.medicContainer}>
                <View style={styles.contImg}>
                  <ShimmerPlaceHolder
                    style={styles.shimmerImg}
                    autoRun={true}
                    visible={visible}
                  >
                    <Image source={Remedio} style={styles.imgMedic} />
                  </ShimmerPlaceHolder>
                </View>
                <View style={styles.contDesc}>
                  <View style={styles.descMedic}>
                    <ShimmerPlaceHolder
                      style={styles.shimmerText}
                      autoRun={true}
                      visible={visible}
                    >
                      <Text style={styles.nameMedic}>{medicament.descMed}, {medicament.composicaoMed}</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                      style={styles.shimmerText}
                      autoRun={true}
                      visible={visible}
                    >
                      <Text style={styles.nameLab}>{medicament.nomeLaboratorio}</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                      style={styles.shimmerText}
                      autoRun={true}
                      visible={visible}
                    >
                      <Text style={styles.dosagemMedic}>{medicament.descDosagem}{medicament.tipoDosagem}</Text>
                    </ShimmerPlaceHolder>
                  </View>              
                  <View style={styles.dadosCompra}>
                    <ShimmerPlaceHolder
                      style={styles.shimmerImgFarma}
                      autoRun={true}
                      visible={visible}
                    >
                      <Image source={Drogaria} style={styles.imgFarma} />
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                      style={styles.shimmerPreco}
                      autoRun={true}
                      visible={visible}
                    >
                      <Text style={styles.precoMedic}>R$ {medicament.precoMed},00</Text>       
                    </ShimmerPlaceHolder>
                  </View>
                </View>
              </TouchableOpacity>
            )}/> 
          </View>   

          <View style={{marginTop: '1%'}}>
            <HeaderScroll title="Estabelecimentos próximos" icon="arrow-right" size={26} />
            <FlatList
              data={estabelecimentos}
              showsVerticalScrollIndicator={true}
              keyExtractor={estabelecimentos => String(estabelecimentos.idEstabelecimento)}
              style={{marginBottom: 130}}
              renderItem={({ item:estabelecimento }) => (
                <View style={{paddingHorizontal: 32}}>
                  <TouchableOpacity onPress={()=> navigateToEstabelecimento(estabelecimento.idEstabelecimento)}>
                    <View style={styles.farmaContainer}>
                      <View style={styles.viewImg}>
                        <ShimmerPlaceHolder
                          style={styles.shimmerImgFarm}
                          autoRun={true}
                          visible={visible}
                        >
                          <Image source={Drogaria} style={styles.ImgFarma} />
                        </ShimmerPlaceHolder>
                      </View>
                      <View style={styles.viewDados}>
                        <ShimmerPlaceHolder
                          style={styles.shimmerTextEstabelecimento}
                          autoRun={true}
                          visible={visible}                        
                        >
                          <Text style={styles.title}>{estabelecimento.nomeEstabelecimento} - {estabelecimento.bairroLogEstabelecimento}</Text>
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                          style={styles.shimmerTextEstabelecimento}
                          autoRun={true}
                          visible={visible}                      
                        >
                          <Text style={styles.subTitle}>1,6 km - R$ 5,00</Text>
                        </ShimmerPlaceHolder>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>)}/>
          </View>
        </ScrollView>
      </View>
    </>
  )
}
