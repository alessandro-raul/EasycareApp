import React from 'react'
import { Text,   StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HeaderBack(props, {navigation}){

function navigateBack(){
    navigation.goBack();
}

    return(
        <View style={styles.header}>
        <View style={{marginLeft: '5%'}} onPress={navigateBack}>
            <Icon name='navigate-before' size={40} color="#23AFDB" />
        </View>
            <View style={{width: '100%', marginLeft: '-13.2%', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: "10%",
        alignItems: 'center',
      
        flexDirection: 'row'
        /*elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#3977A0',
        shadowOpacity: 0.3,*/
    },

    text:{
    
        textAlign: 'center',
        fontSize: 35,
        color: '#23AFDB',
        fontFamily: 'CaviarDreams',
        
    },
})