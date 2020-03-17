import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    Image,
    TouchableNativeFeedback,
} from 'react-native'

class FootPular extends Component{
    render(){
        return(
            
            <View style={styles.container}>
            <TouchableNativeFeedback>
                <View style={styles.btPular}>
                    <Text style={styles.txtPular}>Pular</Text>
                </View>
                </TouchableNativeFeedback>
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    btPular: {
        flex: 1,
        alignItems: 'center', 
        width: '100%',
        height: 50,
        //borderTopStartRadius: 20,
        //borderTopEndRadius: 20,
        backgroundColor: '#277AB1',
        
        
    },
    
    container: {
       marginTop: '15.7%',
       alignItems: 'center',
       height: 145,
       marginBottom: -100

    },

    txtPular:{
        marginTop: 10,
        color: 'white',
        fontSize: 17
    }


})

export default FootPular;