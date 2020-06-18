import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,TouchableOpacity, Keyboard, TextInput, FlatList, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drogaria from '../../../assets/imgs/drogariasp.png';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import Remedio from '../../../assets/imgs/remedio.png';

import styles from './style';
import api from '../../services/api';
import { useNavigation,useRoute } from '@react-navigation/native';

export default function Pesquisa({navigation}){ 
  
  const [tem, setTem] = useState(false);
  const [medicaments, setMedicaments] = useState([]);
  const [search, setSearch] = useState('');
  const todos = true;
  const route = useRoute();
  const idEstabelecimento = route.params.idEstabelecimento;


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTem(false);
      
      setSearch(null);
      this.input.clear(); 
    });
    return unsubscribe;
  }, [navigation]);

  async function loadMedicaments() {
    const response = await api.get('/PesquisaMedicamento', {params:{nomeMedicamento: search,idEstabelecimento: idEstabelecimento}});
    const data = response.data.response;
    setMedicaments(data);

    if(data != null){
      setTem(true);
    }else{
      setTem(false);
    }

  }

  function navigateToEstabelecimento(idEstabelecimento){
    navigation.navigate('PerfilEstabelecimento', {idEstabelecimento});
  }

  const largura = Dimensions.get('screen').width;
  var numColumns;

  if (largura >= 500) {
    numColumns = 3;
  } else {
    numColumns = 2;
  }

  return(
    <>
      <View style={styles.containerSearch}>
        <View style={styles.containerInput}>
          <TouchableOpacity>
            <Icon name="search" size={22} color={"#23AFDB"}/>
          </TouchableOpacity>
          <TextInput style={styles.input}
            placeholder="Pesquisar"
            returnKeyType="done"
            autoCapitalize="sentences"
            placeholderTextColor="#666"
            onChangeText={search => setSearch(search)}
            onSubmitEditing={loadMedicaments}
            ref={(input) => {this.input = input}}
            blurOnSubmit={true}
          ></TextInput>
        </View>
      </View>
    {!tem &&
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS == "android" ? "padding" : "height"}
      > 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{width: '100%', height: '90%', alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{fontSize: 17, color: '#666', textAlign: 'center', width: 250}}>Pesquise um medicamento</Text>
          </View>  
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView> 
    }
    {tem &&  
      <View style={styles.container}>
          <FlatList
            data={medicaments}
            horizontal={false}
            numColumns={numColumns}
            showsHorizontalScrollIndicator={false}
            keyExtractor={medicament => String(medicament.idMedicamento)}
            style={styles.scrollMedic}
            renderItem={({item: medicament}) => (
              <TouchableOpacity
                onPress={() => navigateToDetailMed(medicament)}
                style={styles.medicContainer}>
                <View style={styles.contImg}>
                  <Image source={Remedio} style={styles.imgMedic} />
                </View>
                <View style={styles.contDesc}>
                  <View style={styles.descMedic}>
                    <Text style={styles.nameMedic}>
                      {medicament.descMed}, {medicament.composicaoMed}
                    </Text>
                    <Text style={styles.nameLab}>
                      {medicament.nomeLaboratorio}
                    </Text>
                    <Text style={styles.dosagemMedic}>
                      {medicament.descDosagem}
                      {medicament.tipoDosagem}
                    </Text>
                  </View>

                  <View style={styles.dadosCompra}>
                    <Image source={Drogaria} style={styles.imgFarma} />
                    <Text style={styles.precoMedic}>
                      R$ {medicament.precoMed},00
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
      </View>
    } 
    </>
  )   
}