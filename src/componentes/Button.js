import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


export default function bt(props){
return(
<TouchableOpacity onPress={props.param} style={styles.btAdd} >
    <Text style={styles.txtAdd}>EDITAR</Text>
</TouchableOpacity>


)
}

const styles = StyleSheet.create({
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