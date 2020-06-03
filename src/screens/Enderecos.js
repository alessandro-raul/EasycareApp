import React , {useState, useEffect} from 'react';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { Text, View, StyleSheet, Image, Alert, FlatList } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback} from 'react-native-gesture-handler';
import api from '../services/api';
import triste from '../../assets/imgs/triste.png';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import gifTriste from '../../assets/imgs/gifTriste3.gif';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Geolocation from '@react-native-community/geolocation';

export default function Enderecos({navigation}){
    const [statusLogin, setStatusLogin] = useState(0);
    const [enderecos, setEnderecos] = useState('');
    const [modal, setModal] = useState(false);
    const [tem, setTem] = useState(true);
    const [logModal, setLogModal] = useState();
    const [numLogModal, setNumLogModal] = useState();
    const [bairroLogModal, setBairroLogModal] = useState();
    const [cidadeLogModal, setCidadeLogModal] = useState();
   
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                pegarStatus();
                pegarId();
        });
        return unsubscribe;
    }, [navigation]);

    async function pegarStatus(){
        try {
            const status = await AsyncStorage.getItem('statusLogin');
            if(status== "completo"){
                setStatusLogin(1);
            }else{
                setStatusLogin(2);
            }
        } catch (error) {
            
        }
    }

    function navigateToAdicionar(logCliente, numLogCliente, cepLogCliente, bairroLogCliente, cidadeLogCliente){
        navigation.navigate('AdicionarEndereco', {logCliente, numLogCliente, cepLogCliente, bairroLogCliente, cidadeLogCliente});
    }

    async function navigateToPreLog(){
        try{
            await AsyncStorage.clear();
            const status = "1";
            await AsyncStorage.setItem("statusIntro", status);
            navigation.navigate('PreLog');
        }catch(error){
            console.log(error)
        }
    }

    async function pegarId(){
        try {
            id = await AsyncStorage.getItem("idCliente");
            pegarEnderecos();
        } catch (error) {
            console.log(error);
        }
    }

    function esconderModal(){
        setModal(false);
    }

    async function salvarDados(endereco){
        try {
            await AsyncStorage.setItem("logCliente", endereco.logCliente);
            await AsyncStorage.setItem("numLogCliente", endereco.numLogCliente);
            await AsyncStorage.setItem("cepCliente", endereco.cepLogCliente);
            await AsyncStorage.setItem("complementoLogCliente", endereco.complementoLogCliente);
            await AsyncStorage.setItem("bairroLogCliente", endereco.bairroLogCliente);
            await AsyncStorage.setItem("cidadeLogCliente", endereco.cidadeLogCliente);
            await AsyncStorage.setItem("ufLogCliente", endereco.ufLogCliente);
            await AsyncStorage.setItem("tipoEndereco", endereco.tipoEndereco);
            await AsyncStorage.setItem("idEnderecoCliente", endereco.idEnderecoCliente);
            await AsyncStorage.setItem("idCliente", endereco.idCliente);
            aparecerModal(endereco);
        } catch (error) {
            console.log(error);
        }
    }

    function aparecerModal(endereco){
        setLogModal(endereco.logCliente);
        setNumLogModal(endereco.numLogCliente);
        setBairroLogModal(endereco.bairroLogCliente);
        setCidadeLogModal(endereco.cidadeLogCliente);
        setModal(true);
    }

    function avisoExclusao(){
        Alert.alert(
            "Easycare",
            "Deseja mesmo excluir o endereço?",
            [
              { text: "Sim", onPress: () => excluirEndereco() },
            ],
            { cancelable: true }
          );
        }

    async function excluirEndereco(){
        try{
            const id = await AsyncStorage.getItem("idEnderecoCliente");
            console.log(id);
            await api.delete('/UserAdress/', {params:{idEnderecoCliente: id}});
            setModal(false);
            pegarId();
        }catch(error){
            console.log(error);
        }
    }

    function navigateToEditarEndereco(){
        setModal(false);
       navigation.navigate('EditarEndereco');
    }

    async function pegarEnderecos(){
        try {
            const response = await api.get('/UserAdress/', {params: {idCliente: id}});
            const data = response.data.response;
            
            if (data == "Nenhum usuário encontrado" || data == undefined){ 
               setTem(false);
            } else {
                setTem(true)
            }
            setEnderecos([...enderecos, ...data]);

        } catch (error) {
            console.log(error);
        }
    }

    async function enderecoPadrao(endereco){
        try {
            await AsyncStorage.setItem("idEnderecoCliente", endereco.idEnderecoCliente);
            navigation.goBack();
        } catch (error) {
            console.log('Error');
        }        
    }

    function pegarLocalizacaoAtual(){
      Geolocation.getCurrentPosition(
          ({ coords: {latitude, longitude}}) =>{
            var PO = {
                lat: latitude,
                lng: longitude
            }
            pegar2(PO);
          },
          ()=> {},
          {
              timeout: 2000,
              enableHighAccuracy: true,
              maximumAge: 1000
          }
      )
    }

    async function pegar2(PO){
        var PO = PO; 
        const resp = await Geocoder.geocodePosition(PO,1);
        const logCliente = resp[1].streetName;
        const numLogCliente = resp[1].streetNumber;
        const cepLogCliente = resp[1].postalCode;
        const bairroLogCliente = resp[1].subLocality;
        const cidadeLogCliente = resp[1].adminArea;
        navigateToAdicionar(logCliente, numLogCliente, cepLogCliente, bairroLogCliente, cidadeLogCliente);
    }

    return(
        <>
            <Header text="Endereços"/>

            {statusLogin==2 &&
             <View style={styles.container2}>
                    <Text style={styles.nlTxt}>Você precisa se logar para isso...</Text>
                    <Image source={gifTriste} style={styles.gif}/>
                        <TouchableOpacity style={styles.btLogar} onPress={navigateToPreLog}>
                            <Text style={styles.txtLogar}>Logar agora!</Text>
                        </TouchableOpacity>
                    </View>
            }

            {statusLogin==1 &&
            <View style={styles.fundo}>
                <TouchableNativeFeedback style={styles.touchAdd} onPress={navigateToAdicionar}>
                    <IconFeather name="map-pin" size={25} color="rgba(0,0,0,0.75)"/>
                        <View style={styles.viewLocalizacao}>
                            <Text style={{fontSize: 15}}>Adicionar endereço</Text>
                            <Text style={{fontSize: 14, color:'gray'}}>Adicione um novo endereço aqui</Text>
                        </View>
                </TouchableNativeFeedback>
           
                <TouchableOpacity style={styles.touchLocalizacao} onPress={pegarLocalizacaoAtual}>
                    <Icon name="gps-fixed" size={25} color="rgba(0,0,0,0.75)"/>
                        <View style={styles.viewLocalizacao}>
                            <Text style={{fontSize: 15}}>Usar a localização atual</Text>
                            <Text style={{fontSize: 14, color:'gray'}}>Pressione para usar sua localização atual</Text>
                        </View>
                </TouchableOpacity>
            </View>
            }
              {tem && statusLogin==1 &&
                <FlatList style={{marginTop:'5%'}}
                      data = {enderecos}
                      keyExtractor={endereco => String(endereco.idEnderecoCliente)}
                      showsVerticalScrollIndicator={true}
                      //onEndReached={pegarEnderecos}
                      //onEndReachedThreshold={0.3}
                      renderItem={({item: endereco})=> (
                    <View style={styles.enderecosList}>
                        <View style={styles.endereco}>
                            <TouchableOpacity onPress={()=>enderecoPadrao(endereco)} style={{width:'90%',  marginBottom: '5%', justifyContent:'center', alignItems:'center', flexDirection:'row'}}> 
                                <Icon name="place" size={25} color="rgba(0,0,0,0.75)" style={{paddingBottom: 20}}/>
                                <Text style={styles.enderecoTxt} key={endereco.idEnderecoCliente}>{endereco.logCliente}, {endereco.numLogCliente} - {endereco.bairroLogCliente}, {endereco.cidadeLogCliente}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>salvarDados(endereco)} style={{width:50, height:40, alignItems:'center'}}>
                                    <Icon name="more-vert" size={22} color='#23AFDB'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )} /> 
                }

                {!tem && statusLogin ==1 &&
                    <View style={{justifyContent:'center', alignItems:'center', height: '70%'}}>
                        <Image source={triste} style={{width: 60, height: 60, marginBottom: 10}}/>
                        <Text style={{fontSize: 15}}>Nenhum endereço cadastrado ainda...</Text>
                    </View>
                }
                
            
                <View style={styles.gb}>
                <Modal 
                isVisible={modal} 
                style={styles.bottomModal} 
                onBackdropPress={()=>setModal(false)}>
                    <View style={{backgroundColor: 'white', alignItems:'center'}}>
                    <Text style={{marginTop: 20, fontSize: 16}}>{logModal}, {numLogModal} - {bairroLogModal}, {cidadeLogModal}</Text>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{width:'35%', borderRadius: 50,  marginTop: 20}}>
                                <Button onPress={navigateToEditarEndereco} ViewComponent={LinearGradient}  linearGradientProps={{
                                colors: ['#23AFDB','#23AFDB',
                                
                            ]}} 
                                type="solid" title="Editar endereço"  />
                            </View>
                            <View style={{width:'35%', borderRadius: 50, marginLeft: '5%', marginTop: 20}}>
                                <Button ViewComponent={LinearGradient}  linearGradientProps={{
                                colors: ['#EF5050','#EF5050'] }}
                                type="solid" title="Excluir endereco" onPress={avisoExclusao} />
                            </View>
                        </View>

                        <View style={{marginTop: 8, marginBottom: 8}}>
                        <Button type="clear" title="Cancelar" color="red" onPress={esconderModal} />
                        </View>
                    </View>
                </Modal>
            </View>
            
            
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

    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
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

    enderecosList:{
        alignItems: 'center',
        width: '100%'
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
        paddingBottom: 20,
        fontSize: 14.5
    },

    gb:{
        height: '5%', 
        width: '100%'
    },

    //triste
    container2:{
        height: '100%', 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    },

    nlTxt:{
        fontSize: 20, color: '#666', 
        textAlign: 'center', 
        fontWeight: 'bold',
        width: 250
    },

    btLogar:{
        backgroundColor: '#23AFDB', 
        width: 155, 
        height: 40, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    txtLogar:{
        color: '#fff', 
        fontSize: 17, 
        fontWeight: 'bold'
    },

    gif:{
        width: 110,
        height: 110,
        marginBottom: 10,
        marginTop: 10
    }

})