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

  useEffect(() => {
    gerenciaIntroducao();
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pegarIdEndereco();
      loadMedicaments();  
      loadEstabelecimentos(); 
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
<<<<<<< HEAD
        <ScrollView style={{height: '100%'}}>
          <TouchableOpacity onPress={navigateToEnderecos} style={styles.localizacao}>
              <Icon name='place' size={25} color='#23AFDB'/>
              {tem &&
              <View style={styles.viewLocalizacao}>
              <Text style={styles.txtLocalizacao}>{logCliente}, {numLogCliente}</Text>
=======
      <ScrollView style={{height: '100%', marginTop: 20}}>
     
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
                <Image source={Remedio} style={styles.imgMedic} />
>>>>>>> b7b21b7c4e394791b9a07a4f967d68794a30c113
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
            <HeaderScroll title="Ofertas recentes" icon="arrow-forward" size={26} />                     
            <FlatList
              data={medicaments}
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
                    <Text style={styles.nameMedic}>{medicament.descMed}, {medicament.composicaoMed}</Text>
                    <Text style={styles.nameLab}>{medicament.nomeLaboratorio}</Text>
                    <Text style={styles.dosagemMedic}>{medicament.descDosagem}{medicament.tipoDosagem}</Text>
                  </View>              
                
                  <View style={styles.dadosCompra}>
                    <Image source={Drogaria} style={styles.imgFarma} />
                    <Text style={styles.precoMedic}>R$ {medicament.precoMed},00</Text>       
                  </View>
                </View>
<<<<<<< HEAD
=======
              </View>
            </TouchableOpacity>
          )}
          /> 
        
        </View>   

         <View style={styles.contScroll}>
          <HeaderScroll title="Comprados anteriormente" icon="arrow-right" size={26} />                     
          <FlatList
          data={medicaments}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={medicament => String(medicament.idMedicamento)}
          style={styles.scrollMedic}
          renderItem={({ item:medicament }) => (
          <View style={styles.medicContainer}>
            <View style={styles.contImg}>
              <TouchableOpacity onPress={() => navigateToDetailMed(medicament)} style={styles.hitBox}>
                <Image source={Remedio} style={styles.imgMedic} />
>>>>>>> b7b21b7c4e394791b9a07a4f967d68794a30c113
              </TouchableOpacity>
            )}
            /> 
          </View>

          <View style={styles.contScroll}>
            <HeaderScroll title="Comprados recentemente" icon="arrow-forward" size={26} />                     
            <FlatList
              data={medicaments}
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
                    <Text style={styles.nameMedic}>{medicament.descMed}, {medicament.composicaoMed}</Text>
                    <Text style={styles.nameLab}>{medicament.nomeLaboratorio}</Text>
                    <Text style={styles.dosagemMedic}>{medicament.descDosagem}{medicament.tipoDosagem}</Text>
                  </View>              
                  <View style={styles.dadosCompra}>
                    <Image source={Drogaria} style={styles.imgFarma} />
                    <Text style={styles.precoMedic}>R$ {medicament.precoMed},00</Text>       
                  </View>
                </View>
              </TouchableOpacity>
            )}/> 
          </View>   

          <View style={{marginTop: '1%'}}>
            <HeaderScroll title="Estabelecimentos próximos" icon="arrow-forward" size={26} />
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
                        <Image source={Drogaria} style={styles.ImgFarma} />
                      </View>
                      <View style={styles.viewDados}>
                        <Text style={styles.title}>{estabelecimento.nomeEstabelecimento} - {estabelecimento.bairroLogEstabelecimento}</Text>
                        <Text style={styles.subTitle}>1,6 km - R$ 5,00</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>)}/>
          </View>
<<<<<<< HEAD
=======
          )}
        /> 
        </View>

        <HeaderScroll title="Estabelecimentos proximos" icon="arrow-right" size={26} />
        <FlatList
          data={estabelecimentos}
          showsVerticalScrollIndicator={true}
          keyExtractor={estabelecimentos => String(estabelecimentos.idEstabelecimento)}
          style={{marginBottom: 130}}
          renderItem={({ item:estabelecimento }) => (
            <View style={{paddingHorizontal: 32,}}>
            <TouchableOpacity onPress={()=> navigateToEstabelecimento(estabelecimento.idEstabelecimento)}>
            <View style={styles.farmaContainer}>
              <View style={styles.viewImg}>
                <Image source={Drogaria} style={styles.ImgFarma} />
              </View>
              <View style={styles.viewDados}>
                <Text style={styles.title}>{estabelecimento.nomeEstabelecimento} - {estabelecimento.bairroLogEstabelecimento}</Text>
                <Text style={styles.subTitle}>1,6 km - R$ 5,00</Text>
              </View>
              
            </View>
            </TouchableOpacity>
            </View>
          )}
        />
>>>>>>> b7b21b7c4e394791b9a07a4f967d68794a30c113
        </ScrollView>
      </View>
    </>
  )
}
