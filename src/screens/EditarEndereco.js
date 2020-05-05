import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Picker, ActivityIndicator, Alert} from 'react-native';
import Header from '../componentes/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '../componentes/inputBasico';
import RNPickerSelect from 'react-native-picker-select';
import api from '../services/api';
import {useRoute} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default function EditarEndereco({navigation}){
    
    const [idCliente, setIdCliente] = useState('');
    const [idEnderecoCliente, setIdEnderecoCliente] = useState('');
    const [logCliente, setLogCliente] = useState('');
    const [numLogCliente, setNumLogCliente] = useState('');
    const [cepLogCliente, setCepLogCliente] = useState('');
    const [complementoLogCliente, setComplementoCliente] = useState('');
    const [bairroLogCliente, setBairroLogCliente] = useState('');
    const [cidadeLogCliente, setCidadeLogCliente] = useState('');
    const [ufLogCliente, setUfLogCliente] = useState('');
    const [tipoEndereco, setTipoEndereco] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    var id;
   

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                pegarEndereco();
        });
        return unsubscribe;
    }, [navigation]);

    function navigateToAdicionar(){
        navigation.navigate('AdicionarEndereco');
    }


    async function pegarEndereco(){
        const log = await AsyncStorage.getItem("logCliente");
        const Nlog = await AsyncStorage.getItem("numLogCliente");
        const CEP = await AsyncStorage.getItem("cepCliente");
        const complemento = await AsyncStorage.getItem("complementoLogCliente");
        const bairro = await AsyncStorage.getItem("bairroLogCliente");
        const cidade = await AsyncStorage.getItem("cidadeLogCliente");
        const uf = await AsyncStorage.getItem("ufLogCliente");
        const tp = await AsyncStorage.getItem("tipoEndereco");
        const idEnd = await AsyncStorage.getItem("idEnderecoCliente");
        const id = await AsyncStorage.getItem("idCliente");

        setLogCliente(log);
        setNumLogCliente(Nlog);
        setCepLogCliente(CEP);
        setComplementoCliente(complemento);
        setBairroLogCliente(bairro);
        setCidadeLogCliente(cidade);
        setUfLogCliente(uf);
        setTipoEndereco(tp);
        setIdEnderecoCliente(idEnd);
        setIdCliente(id);
    }

async function AtualizarEndereco(){
        try {
            const data = {
                idEnderecoCliente: idEnderecoCliente,
                idCliente: idCliente,
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
            await api.put('/UserAdress/', data, { params:{idEnderecoCliente: idEnderecoCliente}});
            setShowLoader(false);
            Alert.alert(
                "Easycare",
                "Endereço atualizado com sucesso!",
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
        navigation.goBack();
    }
    
    return(
        <>
            <Header text="Editar Endereço"/>
         
            <ScrollView style={{width: '100%', backgroundColor: 'white'}}>
            <View style={{backgroundColor:"white", height: '100%', alignItems: 'center'}}>
            <View style={styles.mcView}>
                <Icon name='edit-location' size={22} color="rgba(0,0,0,0.75)"/>
                <Text style={styles.txt}>Preencha os dados abaixo</Text>
            </View>
        
                <View style={{width: '80%'}}>
                    <Input placeholder="Endereço"  value={logCliente} onChangeText={logCliente => setLogCliente(logCliente)}></Input>
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
                    <Input placeholder="Complemento" value={complementoLogCliente} onChangeText={complementoLogCliente => setComplementoCliente(complementoLogCliente)}></Input>
                </View>
                <View style={{width: '80%'}}>
                    <Input placeholder="Bairro" value={bairroLogCliente} onChangeText={bairroLogCliente => setBairroLogCliente(bairroLogCliente)}></Input>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "50%", marginRight: "5%"}}>
                        <Input placeholder="Cidade" value={cidadeLogCliente} onChangeText={cidadeLogCliente => setCidadeLogCliente(cidadeLogCliente)}></Input>
                    </View>
                    <View style={{width: "25%"}}>
                        <Input placeholder="UF" value={ufLogCliente} onChangeText={ufLogCliente => setUfLogCliente(ufLogCliente)}></Input>
                    </View>
                </View>
                <View style={{width: '80%', borderWidth:1, borderRadius: 10, marginTop: '5%',   borderColor: 'rgba(70,70,70, 0.31)',}}>
                    <RNPickerSelect
                        value={tipoEndereco}
                        onValueChange={tipoEndereco => setTipoEndereco(tipoEndereco)}
                        items={[
                            { label: 'Residência', value: 'Residência' },
                            { label: 'Comércio', value: 'Cómercio' },
                        ]}
                        placeholder = { 
                            {label: "Tipo de endereço", value: null}
                        }
                        />
                </View>
                <View style={{marginTop: '7%', marginBottom: '7%'}}>
                    <TouchableOpacity onPress={AtualizarEndereco} style={styles.btAdd}>
                            {!showLoader &&
                                    <Text style={styles.txtAdd}>Salvar</Text>
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