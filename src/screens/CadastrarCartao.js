import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../componentes/Header';
import IconFeather from 'react-native-vector-icons/Feather';
import Input from '../componentes/inputBasico';


export default function CadatrarCartao(){
    return(
        <>
        <Header text="Adicionar Cartão"/>
            <View style={{backgroundColor:"white", height: '100%', alignItems: 'center'}}>
            <View style={styles.mcView}>
                <IconFeather name='credit-card' size={20} color="rgba(0,0,0,0.75)"/>
                <Text style={styles.txt}>Preencha os dados abaixo</Text>
            </View>
                <View style={{width: '80%'}}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            returnKeyType="next"
                            keyboardType="numeric"
                            placeholder="Número do cartão"
                            onSubmitEditing={() => this.input2.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{width: "37%", marginRight: "6%"}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                returnKeyType="next"
                                placeholder="Validade"
                                ref={(input) => {this.input2 = input;}} 
                                onSubmitEditing={() => this.input3.focus()}
                                blurOnSubmit={false}                           
                            />
                        </View>
                    </View>
                    <View style={{width: "37%"}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input}
                                returnKeyType="next"
                                keyboardType="numeric"
                                placeholder="CVV"
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
                            returnKeyType="next"
                            autoCapitalize="characters"
                            autoCompleteType="name"
                            placeholder="Nome do titular"
                            ref={(input) => {this.input4 = input;}}
                            onSubmitEditing={() => this.input5.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                </View>
                <View style={{width: '80%'}}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            returnKeyType="done"
                            keyboardType="numeric"
                            placeholder="CPF/CNPJ"
                            ref={(input) => {this.input5 = input;}}
                        />
                    </View>
                </View>
                <View style={{marginTop: '7%'}}>
                    <TouchableOpacity style={styles.btAdd} >
                        <Text style={styles.txtAdd}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
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