import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Picker, ScrollView, ActivityIndicator, Alert, TextInput} from 'react-native';
import Header from '../componentes/Header';
import IconFeather from 'react-native-vector-icons/Feather';
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
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            returnKeyType="next"
                            autoCapitalize="sentences"
                            keyboardType="default"
                            placeholder="Endereço"
                            placeholderTextColor="#666"
                            value={logCliente} 
                            onChangeText={logCliente => setLogCliente(logCliente)}
                            onSubmitEditing={() => this.input2.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row'}}> 
                    <View style={{width: "35%", marginRight: "5%"}}> 
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCompleteType="off"
                                keyboardType="default"
                                autoCorrect={false}
                                placeholder="Número"
                                placeholderTextColor="#666"
                                value={numLogCliente} 
                                onChangeText={numLogCliente=> setNumLogCliente(numLogCliente)}
                                ref={(input) => {this.input2 = input;}}
                                onSubmitEditing={() => this.input3.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                    <View style={{width: "40%"}}> 
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCompleteType="off"
                                keyboardType="numeric"
                                autoCorrect={false}
                                placeholder="CEP"
                                placeholderTextColor="#666"
                                value={cepLogCliente} 
                                onChangeText={cepLogCliente => setCepLogCliente(cepLogCliente)}
                                ref={(input) => {this.input3 = input;}}
                                onSubmitEditing={() => this.input4.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View> 
                </View> 
                <View style={{width: '80%'}}> 
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            returnKeyType="go"
                            autoCapitalize="sentences"
                            keyboardType="default"
                            placeholder="Complemento"
                            placeholderTextColor="#666"
                            onChangeText={complementoLogCliente => 
                            setComplementoCliente(complementoLogCliente)}
                            ref={(input) => {this.input4 = input;}}
                            /*
                            onSubmitEditing={() => this.input5.focus()}
                            blurOnSubmit={false}
                            */
                        />
                    </View>
                </View>

                <View style={{width: '80%', borderWidth:1, borderRadius: 10, marginTop: '5%',   borderColor: 'rgba(70,70,70, 0.31)',}}> 
                    <RNPickerSelect 
                        onValueChange={tipoEndereco => setTipoEndereco(tipoEndereco)} 
                        items={[ 
                            { label: 'Residência', value: 'Residência', color:'#666'},
                            { label: 'Comércio', value: 'Cómercio', color:'#666'},
                        ]} 
                        placeholder = {  
                            {label: "Tipo de endereço", value: null, color:'#666'}
                        }/> 
                </View> 

                <View style={{width: '80%'}}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            returnKeyType="next"
                            autoCapitalize="sentences"
                            keyboardType="default"
                            placeholder="Bairro"
                            placeholderTextColor="#666"
                            value={bairroLogCliente} 
                            onChangeText={bairroLogCliente => setBairroLogCliente(bairroLogCliente)}
                            ref={(input) => {this.input5 = input;}}
                            onSubmitEditing={() => this.input6.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "50%", marginRight: "5%"}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                returnKeyType="next"
                                autoCapitalize="sentences"
                                keyboardType="default"
                                placeholder="Cidade"
                                placeholderTextColor="#666"
                                value={cidadeLogCliente} 
                                onChangeText={cidadeLogCliente => setCidadeLogCliente(cidadeLogCliente)}
                                ref={(input) => {this.input6 = input;}}
                                onSubmitEditing={() => this.input7.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                    <View style={{width: "25%"}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                returnKeyType="done"
                                autoCapitalize="characters"
                                autoCompleteType="off"
                                autoCorrect={false}
                                maxLength={2}
                                placeholder="UF"
                                placeholderTextColor="#666"
                                onChangeText={ufLogCliente => 
                                setUfLogCliente(ufLogCliente)}
                                ref={(input) => {this.input7 = input;}}
                                onSubmitEditing={pegarIdCliente}
                                //blurOnSubmit={false}
                            />
                        </View>
                    </View>
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
        },
    
        inputContainer: {
            borderColor: 'rgba(70,70,70, 0.31)',
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 20,
            marginTop: 25,
            flexDirection: 'row',
           
          },
        
          input: {
            fontSize: 16,
            color: '#666',
            flex: 1
          }
    })
