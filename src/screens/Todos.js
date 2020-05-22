import React, { useState, useEffect } from 'react';
import { View, Text, Image,TouchableOpacity, StyleSheet, Dimensions, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MeuHeader from '../componentes/Header';
import api from '../services/api';
import Remedio from '../../assets/imgs/remedio.png';

export default function Todos({navigation}){
    const [medicaments, setMedicaments] = useState([]);
    const route = useRoute();
    navigation = useNavigation();
    const nomeCategoria = route.params.nomeCategoria;
    const idEstabelecimento = route.params.idEstabelecimento;
 
    useEffect(() => {
        loadMedicaments(idEstabelecimento, nomeCategoria);
      }, []);

    async function loadMedicaments(idEstabelecimento, nomeCategoria) {
        const response = await api.get('/Medicament', { params: {idEstabelecimento: idEstabelecimento, nomeCategoria: nomeCategoria}});
        const data = response.data.response;
        setMedicaments(data);
    }

    function navigateToDetailMed(medicament, nomeEstabelecimento) {
        console.log(medicament);
        navigation.navigate('DetailMed', { medicament, nomeEstabelecimento })
    }

    const largura = Dimensions.get('screen').width;
    var numColumns;

    if(largura>=400){
        numColumns = 3;
    }else{
        numColumns = 2;
    }

    return(
        <>
            <MeuHeader text="Todos"/>
            <View style={styles.container}>
                <View style={styles.contScroll}>                   
                <FlatList
                data={medicaments}
                horizontal={false}
                numColumns={numColumns}
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
                    
                    <Text style={styles.precoMedic}>R$ {medicament.precoMed},00</Text>       
                    </View>
                </View>
                </TouchableOpacity>
                )}/> 
                </View> 
            </View>
        </>
    )
}

const styles = StyleSheet.create({
   container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center'  
  },

  contScroll: {
    flexDirection: 'row',
    //backgroundColor: 'green',
    alignItems: 'center',
    width: '100%',
  },
  
  scrollMedic: {  
    height: '100%',
  },

  medicContainer: {
    width: 130,
    height: 270,
    marginLeft: 23,
    marginTop: 22,
    padding: 7,
    
    justifyContent:'center',
    alignItems: 'center',    
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'red',  
  },
  
  contImg: {
    width: '90%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#333',  
  },

  imgMedic: {
    width: 65,
    height: 65,
  },

  contDesc: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)'
  },

  dadosCompra: {
    width:'100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    //backgroundColor:'#fff'
  },
  
  imgFarma: {
    width: 25,
    height: 25,
    borderRadius: 20,  
  },

  descMedic: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    //backgroundColor: 'yellow',
  },

  nameMedic: {
    fontSize: 14, 
    color: '#707070', 
  }, 

  nameLab: {
    fontWeight: '700',
    fontSize: 14, 
    color: '#707070', 
  },

  dosagemMedic: {
    fontSize: 14, 
    color: '#707070', 
  },

  precoMedic: {
    fontSize: 14,
    color: '#1F9433'  
  }
  });