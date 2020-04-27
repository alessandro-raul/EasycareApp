import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Remedio from '../../../assets/imgs/remedio.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cupom from 'react-native-vector-icons/FontAwesome5';

import styles from './style';

import Header from '../../componentes/Header';


export default function Pedido(){

  return(
    <>  
    <Header text="Pedido"/>  
    <View style={styles.container}>

      <TouchableOpacity style={styles.contEntrega}>
        <View style={styles.icons}>
          <Icon name="room" size={32} color='#23AFDB'/>  
        </View>
        <View style={styles.local}>
          <Text style={styles.subTitleBold}>Entregar em:</Text>
          <Text style={styles.cont}>R. dos bobos, 0</Text>  
        </View>
        <Icon name="keyboard-arrow-right" size={32} color="#23AFDB"/>  
      </TouchableOpacity>
      
      <View style={styles.contProd}>
        <View>
          <Image source={Remedio} style={styles.imgProd}/>  
        </View>
        <View style={styles.dadosProd}>
          <Text style={styles.subTitle}>Dipirona, 20Mg</Text>
          <View style={styles.dadosFarma}>
            <Text style={styles.contMenor}>Vendido por </Text>
            <Text style={{fontWeight: '700'}}>Ultrafarma</Text>
          </View>
          <View style={styles.quant}>
            <Text style={styles.subTitleBold}>Quantidade:</Text>
            <View style={styles.controls}>
              <TouchableOpacity>
                <Icon name="remove" size={24} color="#23AFDB"/>
              </TouchableOpacity>
              <Text style={styles.cont}>1</Text>
              <TouchableOpacity>
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
        <Text style={styles.cont}>R$ 15,00</Text>
        <Text style={styles.cont}>R$ 5,00</Text>
        <Text style={styles.cont}>R$ 20,00</Text>
      </View>  

      <TouchableOpacity style={styles.contCupom}>
        <Cupom name="ticket-alt" size={28} color="#23AFDB"/>  
        <View style={styles.dadosCupom}>
          <Text style={styles.subTitleBold}>Cupom:</Text>
          <Text style={styles.cont}>Inserir cupom</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={32} color="#23AFDB"/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contPagto}>
        <Icon name="payment" size={32} color="#23AFDB"/>  
        <View style={styles.dadosPagto}>
          <Text style={styles.subTitleBold}>Pagamento:</Text>
          <Text style={styles.cont}>Formas de pagamento</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={32} color="#23AFDB"/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btPedir}>
        <Text style={styles.btText}>Pedir</Text>  
      </TouchableOpacity>
    </View>
    </>
  )
}