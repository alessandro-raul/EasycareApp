import React from 'react'
import { Text,   StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import Ubuntu from '../../assets/fonts/ubuntu.ttf'


export default function Header(props){

function fun(){
    props.navigation.navigate('Home');
}

    return(
        
        <View style={styles.header}>
            <TouchableOpacity onPress={fun}>
            <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#3977A0',
        shadowOpacity: 0.3,
    },
 
    text:{
        textAlign: 'center',
        fontSize: 30,
        color: '#23AFDB',
        fontFamily: 'CaviarDreams',
        width: '100%'
        
    },
})