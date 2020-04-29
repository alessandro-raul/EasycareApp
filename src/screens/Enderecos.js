import React , {useState, useEffect} from 'react';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, Text, View, StyleSheet, Image, AsyncStorage, Alert, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback} from 'react-native-gesture-handler';
import Input from '../componentes/InputComIconQuad';
import api from '../services/api';
import InputComIconQuad from '../componentes/InputComIconQuad';

export default function Enderecos({navigation}){

    function navigateToAdicionar(){
        navigation.navigate('AdicionarEndereco');
    }

    return(
        <>
            <Header text="Endereços"/>
            <View style={styles.fundo}>
                {/*View style={styles.inputPesquisa}>  
                    <InputComIconQuad icon="search" placeholder="Digite o endereço e o número"/>
                </View>*/}

                <TouchableOpacity style={styles.touchAdd} onPress={navigateToAdicionar}>
                    <Icon name="edit-location" size={25} color="rgba(0,0,0,0.75)"/>
                        <View style={styles.viewLocalizacao}>
                            <Text style={{fontSize: 15}}>Adicionar endereço</Text>
                            <Text style={{fontSize: 14, color:'gray'}}>Adicione um novo endereço aqui</Text>
                        </View>
                </TouchableOpacity>
           

                <TouchableOpacity style={styles.touchLocalizacao}>
                    <Icon name="gps-fixed" size={25} color="rgba(0,0,0,0.75)"/>
                        <View style={styles.viewLocalizacao}>
                            <Text style={{fontSize: 15}}>Usar a localização atual</Text>
                            <Text style={{fontSize: 14, color:'gray'}}>R. dos Bobos, 0 - Itaim Paulista</Text>
                        </View>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.ScrollView}>
                <View style={styles.enderecosList}>
                    <View style={styles.endereco}>
                        <TouchableNativeFeedback style={{width:'90%', justifyContent:'center', alignItems:'center', flexDirection:'row'}} onPress={()=>alert("heyy2")}>
                            <Icon name="place" size={25} color="rgba(0,0,0,0.75)"/>
                            <Text style={styles.enderecoTxt}>Rua Guabiroba 190 - Itaim Paulista</Text>
                        </TouchableNativeFeedback>
                        <TouchableOpacity onPress={()=>alert("heyy")} style={{width:50, height:40, alignItems:'center'}}>
                                <Icon name="more-vert" size={22} color='#23AFDB'/>
                        </TouchableOpacity>
                    </View>
                    
               
                    <View style={styles.endereco}>
                        <TouchableNativeFeedback style={{width:'90%', justifyContent:'center', alignItems:'center', flexDirection:'row'}} onPress={()=>alert("heyy2")}>
                            <Icon name="place" size={25} color="rgba(0,0,0,0.75)"/>
                            <Text style={styles.enderecoTxt}>Rua dos Bobos, 0 - São Miguel Paulista</Text>
                        </TouchableNativeFeedback>
                        <TouchableOpacity onPress={()=>alert("heyy")} style={{width:50, height:40, alignItems:'center'}}>
                                <Icon name="more-vert" size={22} color='#23AFDB'/>
                        </TouchableOpacity>
                    </View>
        
                    <View style={styles.endereco}>
                        <TouchableNativeFeedback style={{width:'90%', justifyContent:'center', alignItems:'center', flexDirection:'row'}} onPress={()=>alert("heyy2")}>
                            <Icon name="place" size={25} color="rgba(0,0,0,0.75)"/>
                            <Text style={styles.enderecoTxt}>Rua machado de Assis, 70 - Guaianazes</Text>
                        </TouchableNativeFeedback>
                        <TouchableOpacity onPress={()=>alert("heyy")} style={{width:50, height:40, alignItems:'center'}}>
                                <Icon name="more-vert" size={22} color='#23AFDB'/>
                        </TouchableOpacity>
                    </View>
               
                <View style={styles.gb}>
                    <Text></Text>
                </View>
                </View>
            </ScrollView>
        </>
    )
} 

const styles = StyleSheet.create({
    fundo:{
        height: 160,
        justifyContent: 'center',
        backgroundColor:'white', 
        alignItems:'center'
    },

    inputPesquisa:{
        width:'90%', 
        alignItems:'center',  
        marginBottom: 20
    },

    touchLocalizacao:{
        flexDirection: 'row', 
     
        height: 70,
        justifyContent:'center', 
        alignItems: 'center'
    },

    touchAdd:{
        height: 70,
        flexDirection: 'row', 
        justifyContent:'center', 
        alignItems: 'center'
    },

    viewLocalizacao:{
        marginLeft:'4%', 
        width: "80%",
        justifyContent:'center'
    },

    ScrollView:{ 
        height:'100%'
    },

    enderecosList:{
        alignItems:'center', 
        marginTop: '5%'
    },

    endereco:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: '85%', 
        minHeight: 80, 
        marginBottom: '5%'
    },

    enderecoTxt:{
        width: '75%',
        marginLeft: '5%',
        paddingTop: 10,
        paddingBottom: 10
    },

    gb:{
        height: '5%', 
        width: '100%'
    }










})