import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native'

function FootPular ({navigation}){
    function navigateToHome(){
        navigation.navigate('Home');
      }

        return(
            <View style={styles.bt}>
                <View style={styles.btLogar}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Text style={styles.txtPular}>Pular</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    bt:{
    },

    btLogar:{
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
    },

    txtPular:{

        textAlign: 'center',
        color: '#707070',
        fontSize: 16
    }
})

export default FootPular;
