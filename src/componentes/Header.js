import React from 'react'
import { Text,   StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
<<<<<<< HEAD
=======
      
>>>>>>> 1c6527b9eb5264e83558203a073b0975b0c31a2c
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
<<<<<<< HEAD
        elevation: 1,
        shadowOffset: { width: 3, height: 1 },
=======
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
>>>>>>> 1c6527b9eb5264e83558203a073b0975b0c31a2c
        shadowColor: '#3977A0',
        shadowOpacity: 0.3,
    },

    text:{
      
        textAlign: 'center',
        fontSize: 30,
        color: '#23AFDB',
        fontFamily: 'CaviarDreams',
        
    },
})