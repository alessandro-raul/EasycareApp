import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Picker, ScrollView, ActivityIndicator, Alert} from 'react-native';
import Header from '../componentes/Header';
import IconFeather from 'react-native-vector-icons/Feather';
import Input from '../componentes/inputBasico';
import RNPickerSelect from 'react-native-picker-select';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useRoute } from '@react-navigation/native';

export default function AdicionarEndereco({navigation}){
    const [idCliente, setIdCliente] = useState('');
    const [logCliente, setLogCliente] = useState('');
    const [numLogCliente, setNumLogCliente] = useState('');
    const [cepLogCliente, setCepLogCliente] = useState('');
    const [complementoLogCliente, setComplementoCliente] = useState('');
    const [bairroLogCliente, setBairroLogCliente] = useState('');
    const [cidadeLogCliente, setCidadeLogCliente] = useState('');
    const [ufLogCliente, setUfLogCliente] = useState('');
    const [tipoEndereco, setTipoEndereco] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const route = useRoute();
    var id;
    var idEnd;
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                pegarGps();
        });
        return unsubscribe;
    }, [navigation]);

    function pegarGps(){
        try {
            const logCliente = route.params.logCliente;
            const numLogCliente = route.params.numLogCliente;
            const cepLogCliente = route.params.cepLogCliente;
            const bairroLogCliente = route.params.bairroLogCliente; 
            const cidadeLogCliente = route.params.cidadeLogCliente;
    
            setLogCliente(logCliente);
            setNumLogCliente(numLogCliente);
            setCepLogCliente(cepLogCliente);
            setBairroLogCliente(bairroLogCliente);
            setCidadeLogCliente(cidadeLogCliente);
        } catch (error) {
            console.log(error);
        }
    }

    async function pegarIdCliente(){
        try {
            setShowLoader(true);
            id = await AsyncStorage.getItem("idCliente");
            AdicionaEndereco();
        } catch (error) {
            setShowLoader(false);
            console.log(error);
        }
    }

    async function AdicionaEndereco(){
        try {
            const data = {
                idCliente: id,
                logCliente: logCliente,
                numLogCliente: numLogCliente,
                cepLogCliente: cepLogCliente,
                complementoLogCliente: complementoLogCliente,
                bairroLogCliente: bairroLogCliente,
                cidadeLogCliente: cidadeLogCliente,
                ufLogCliente: ufLogCliente,
                tipoEndereco: tipoEndereco
            }
            setShowLoader(true);
            await api.post('/UserAdress/', data);
            setShowLoader(false);
            Alert.alert(
                "Easycare",
                "Endereço adicionado com sucesso!",
                [
                  { text: "OK", onPress: () => voltar() }
                ],
                { cancelable: false }
              );
        }catch (error) {
            setShowLoader(false)
            alert(error);
        }
    }

    function voltar(){
        navigation.navigate('Home');
    }
    
    return(
        <>
        <Header text="Adicionar Endereço"/>
        <ScrollView style={{width: '100%', backgroundColor: 'white'}}>
            <View style={{backgroundColor:"white", height: '100%', alignItems: 'center'}}>
            <View style={styles.mcView}>
                <IconFeather name='map-pin' size={20} color="rgba(0,0,0,0.75)"/>
                <Text style={styles.txt}>Preencha os dados abaixo</Text>
            </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Endereço" value={logCliente} onChangeText={logCliente => setLogCliente(logCliente)}></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "35%", marginRight: "5%"}}>
                        <Input placeholder="Número" value={numLogCliente} onChangeText={numLogCliente=> setNumLogCliente(numLogCliente)}></Input>
                    </View>
                    <View style={{width: "40%"}}>
                        <Input placeholder="CEP" value={cepLogCliente} onChangeText={cepLogCliente => setCepLogCliente(cepLogCliente)}></Input>
                    </View>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Complemento" onChangeText={complementoLogCliente => setComplementoCliente(complementoLogCliente)}></Input>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Bairro" value={bairroLogCliente} onChangeText={bairroLogCliente => setBairroLogCliente(bairroLogCliente)}></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "50%", marginRight: "5%"}}>
                        <Input placeholder="Cidade" value={cidadeLogCliente} onChangeText={cidadeLogCliente => setCidadeLogCliente(cidadeLogCliente)}></Input>
                    </View>
                    <View style={{width: "25%"}}>
                        <Input placeholder="UF" onChangeText={ufLogCliente => setUfLogCliente(ufLogCliente)}></Input>
                    </View>
                </View>
                <View style={{width: '80%', borderWidth:1, borderRadius: 10, marginTop: '5%',   borderColor: 'rgba(70,70,70, 0.31)',}}>
                    <RNPickerSelect
                        onValueChange={tipoEndereco => setTipoEndereco(tipoEndereco)}
                        items={[
                            { label: 'Residência', value: 'Residência' },
                            { label: 'Comércio', value: 'Cómercio' },
                        ]}
                        placeholder = { 
                            {label: "Tipo de endereço", value: null}
                        }/>
                </View>
                <View style={{marginTop: '7%', marginBottom: '7%'}}>
                    <TouchableOpacity style={styles.btAdd} onPress={pegarIdCliente}>
                        
                        
                            {!showLoader &&
                                    <Text style={styles.txtAdd}>Adicionar</Text>
                            }

                            {showLoader &&
                                <ActivityIndicator animating={showLoader} size="small" 
                                color="white" />
                            }
                        
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mcView:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width:'60%',
        marginTop: 25
    },
    
    txt:{
        fontSize: 18,
        color: 'rgba(0,0,0,0.60)',
        textAlign: 'center',
        marginLeft: '2%'
    },

    btAdd:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        height: 42,
        backgroundColor: '#23AFDB',
        borderRadius: 50
    },

    txtAdd:{
        textAlign:"center", 
        fontSize: 17, 
        color: 'white'
    }
})