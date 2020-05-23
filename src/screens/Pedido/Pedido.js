import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image} from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

import Remedio from '../../../assets/imgs/remedio.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Cupom from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../componentes/Header';


export default function Pedido(){
  const navigation = useNavigation();
  const [quant, setQuant] = useState(1);
  const [logCliente, setLogCliente] = useState();
  const [numLogCliente, setNumLogCliente] = useState();
  const [statusEnd, setStatusEnd] = useState(true);
  const [tem, setTem] = useState(true);
  var medicament;
  var auxNome;
  const route = useRoute();

  try{
    medicament = route.params.medicament;
    auxNome = route.params.nomeEstabelecimento;
  }catch{
    console.log('hm')
  }
 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
            pegarIdEndereco();
    });
    return unsubscribe;
  }, [navigation]);

  function addQuant() {
    if(quant<10) {
      setQuant(quant+1);
    }
  }

  function removeQuant() {
    if(quant>0) {
      setQuant(quant-1);
    }
  }

  function navigateToEnderecos() {
    navigation.navigate('Enderecos');
  }

  function navigateToCupom(){
    navigation.navigate('Cupom');
}

function navigateToPagamentoPerfil(){
  navigation.navigate('PagamentoPerfil');
}

  async function pegarIdEndereco(){
    try{
      idd = await AsyncStorage.getItem("idEnderecoCliente");
      console.log(idd);
      
     /* if (idd != null){ 
        setTem(true);
      } else {
        setTem(false);
      }*/
      
      pegarEndereco();
    }catch(error){
      console.log(error);
    }
  }

  async function pegarEndereco(){
    try{
      const response = await api.get('/UserAdress/', {params: {idEnderecoCliente : idd}});
      const data = response.data.response;
      console.log(data);
    
      if (data == "Nenhum usuário encontrado" || data== undefined){ 
        setTem(false);
    } else {
        setTem(true);
    }
      data.map(item => {
        setLogCliente(item.logCliente);
        setNumLogCliente(item.numLogCliente);
      
      });   

    }catch(error){
      console.log(error);
    } 
  }
  
  return(  
    <>  
    <Header text="Pedido"/>  
    <View style={styles.container}>

      <TouchableNativeFeedback onPress={navigateToEnderecos} style={styles.contEntrega}>
        <View style={styles.icons}>
          <IconFeather name="map-pin" size={28} color='#23AFDB'/>  
        </View>
        <View style={styles.local}>
          <Text style={styles.subTitleBold}>Entregar em:</Text>

          {tem &&
          <Text style={styles.cont}>{logCliente}, {numLogCliente}</Text>
          }

          {!tem &&
            <Text style={styles.cont}>Selecione um endereço</Text>
          }
       
        </View>
        <Icon name="keyboard-arrow-right" size={32} color="#23AFDB"/>  
      </TouchableNativeFeedback>
      
      <View style={styles.contProd}>
        <View>
          <Image source={Remedio} style={styles.imgProd}/>  
        </View>
        <View style={styles.dadosProd}>
          <Text style={styles.subTitle}>{medicament.descMed}, {medicament.descDosagem}</Text>
          <View style={styles.dadosFarma}>
            <Text style={styles.contMenor}>Vendido por </Text>
            <Text style={{fontWeight: '700'}}>{auxNome}</Text>
          </View>
          <View style={styles.quant}>
            <Text style={styles.subTitleBold}>Quantidade:</Text>
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => removeQuant()}>
                <Icon name="remove" size={24} color="#23AFDB"/>
              </TouchableOpacity>
              <Text style={styles.cont}>{quant}</Text>
              <TouchableOpacity onPress={() => addQuant()}>
                <Icon name="add" size={24} color="#23AFDB"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contPedido}>
        <Text style={styles.subTitle}>Subtotal:</Text>
        <Text style={styles.subTitle}>Frete:</Text>
        <Text style={styles.subTitleMaiorBold}>Total:</Text>
        <Text style={styles.cont}>
       R$ {medicament.precoMed},00
        </Text>
        <Text style={styles.cont}>R$ 5,00</Text>
        <Text style={styles.cont}>R$ 20,00</Text>
      </View>  

      <TouchableNativeFeedback onPress={navigateToCupom} style={styles.contCupom}>
        <IconComunity name="cards-outline" size={28} color="#23AFDB"/>  
        <View style={styles.dadosCupom}>
          <Text style={styles.subTitleBold}>Cupom:</Text>
          <Text style={styles.cont}>Inserir cupom</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={32} color="#23AFDB"/>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={navigateToPagamentoPerfil} style={styles.contPagto}>
        <IconFeather name="credit-card" size={26} color="#23AFDB"/>  
        <View style={styles.dadosPagto}>
          <Text style={styles.subTitleBold}>Pagamento:</Text>
          <Text style={styles.cont}>Formas de pagamento</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={32} color="#23AFDB"/>
      </TouchableNativeFeedback>

      <TouchableOpacity style={styles.btPedir}>
        <Text style={styles.btText}>Pedir</Text>  
      </TouchableOpacity>
    </View>
    </>
  )
}