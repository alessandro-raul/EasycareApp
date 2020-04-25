import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,  
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableOpacityBase,
} from 'react-native'

import pesquisa from '../../assets/imgs/pesquisa2.png';
import entrega from '../../assets/imgs/entrega2.png';
import check from '../../assets/imgs/check3.png';
import easy from '../../assets/imgs/iconeCortado.png';
import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function IntrodutionAppScroll({navigation}){

    function navigateToLogin(){
        navigation.navigate('PreLog');
      }

        return(
            <View style={{height: '100%', backgroundColor: 'white'}}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    persistentScrollbar={true}
                    showsHorizontalScrollIndicator={false}
                    >

                    <StatusBar translucent backgroundColor="transparent" />
                    <View style={styles.Screen4}>
                        <View style={styles.screenCont}>
                            <Image source={easy} style={styles.logoImg}></Image>
                            <Text style={styles.Text}>Bem-Vindo ao Easycare!</Text>
                            <Text style={styles.descTxt}>O app que facilita sua vida...</Text>
                        </View>
                        <View style={styles.btCircle}>
                            <View style={styles.circle2}></View>
                            <View style={styles.circle} ></View>
                            <View style={styles.circle2}></View>
                        </View>
                    </View>
                    
                    <View style={styles.Screen4}>
                        <View style={styles.screenCont}>
                            <Image source={pesquisa} style={styles.imagem} />
                            <Text style={styles.Text}>Rápido e fácil</Text>
                            <Text style={styles.descTxt}>Você escolhe o medicamento e realiza sua compra</Text>
                        </View>
                        <View style={styles.btCircle}>
                            <View style={styles.circle2}></View>
                            <View style={styles.circle} ></View>
                            <View style={styles.circle2}></View>
                        </View>
                    </View>
                    <View style={styles.Screen4}>
                        <View style={styles.screenCont}>
                            <Image source={entrega} style={styles.imagemEntrega} />
                            <Text style={styles.Text}>Recebe em casa</Text>
                            <Text style={styles.descTxt}>Ao comprar a farmácia envia um entregador até você</Text>
                        </View>
                    </View>
                    <View style={styles.Screen4}>
                        <View style={styles.screenCont}>
                            <Image source={check} style={styles.imagem} />
                            <Text style={styles.Text}>Confiável e seguro ;)</Text>
                            <Text style={styles.descTxt}>Você realiza o pagamento direto para o entregador!</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                onPress={navigateToLogin} style={{height: +1}}
                style={{backgroundColor: 'white'}}>
                      <Text style={styles.txtPular}>Pular</Text>
                </TouchableOpacity>
            </View>
        );
    }

const styles = StyleSheet.create({
    topBar:{
        width: Dimensions.get('window').width,
        height:'12%',
        paddingTop:20,
        backgroundColor: '#277AB1',
        justifyContent: "center",
        alignItems: 'center',
    },

    Screen4:{
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: '#fff',
    },
    
    screenCont:{
        padding: 20,
        backgroundColor: 'blue',
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    Text:{
        fontFamily: 'CaviarDreams',
        textAlign:"center",
        fontSize: 30,
        color: '#23AFDB'
    },

    descTxt: {
        fontSize: 16, 
        textAlign: 'center', 
        marginTop: 10,
        color:'rgba(0,0,0,0.6)'
    },

    imagem:{
        width: 135,
        height: 135,
        marginBottom: 10
    },

    logoImg:{
        width: 130,
        height: 130,
        marginBottom: 10
    },

    imagemEntrega:{
        width: 145,
        height: 145,
    },

    txtPular:{
        marginBottom: "4%",
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        color: '#707070',
        textDecorationLine:'underline',
    }
});