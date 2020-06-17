import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,TouchableOpacity, Keyboard, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drogaria from '../../../assets/imgs/drogariasp.png';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import styles from './style';
import api from '../../services/api';

import InputComIconQuad from '../../componentes/InputComIconQuad';
import SearchBar from '../../componentes/SearchBar';

export default function Pesquisa({navigation}){ 
  
  const [tem, setTem] = useState(false);
  const [visible, setVisible] = useState(false);

  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTem(false);
    });
    return unsubscribe;
  }, [navigation]);

  async function buscarEstabelecimentos() {
    const response = await api.get('/PesquisaEstabelecimento', {params: {nomeEstabelecimento:search}});
    const data = response.data.response;
    setEstabelecimentos(data);

    if(data != null){
      setTem(true);
      setVisible(true);
    }else{
      setTem(false);
    }
    
    setSearch(null);
    this.input.clear();
  }

  function navigateToEstabelecimento(idEstabelecimento){
    navigation.navigate('PerfilEstabelecimento', {idEstabelecimento});
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
            onSubmitEditing={buscarEstabelecimentos}
            ref={(input) => {this.input = input}}
            blurOnSubmit={true}
          ></TextInput>
        </View>
      </View>
    
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS == "android" ? "padding" : "height"}
    >
      {!tem && 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{width: '100%', height: '90%', alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{fontSize: 17, color: '#666', textAlign: 'center', width: 250}}>Pesquise um Estabelecimento</Text>
          </View>  
        </TouchableWithoutFeedback>
      }
      {tem &&      
        <FlatList
          data={estabelecimentos}
          showsVerticalScrollIndicator={false}
          keyExtractor={estabelecimentos => String(estabelecimentos.idEstabelecimento)}
          style={{marginBottom: 130, marginTop: 30, height: '100%'}}
          renderItem={({ item:estabelecimento }) => (
            <View>
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
            </View>
          )}
        />
      }
    </KeyboardAvoidingView>  
    </>
  )   
}