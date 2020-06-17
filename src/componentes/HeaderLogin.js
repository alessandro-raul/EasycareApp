import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import CaviarDreams from '../../assets/fonts/CaviarDreams.ttf'

class HeaderLogin extends Component{
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.text}>Easycare</Text>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        /*elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#3977A0',
        shadowOpacity: 0.3,*/
    },

    text:{
        marginTop: 10,
        textAlign: 'center',
        fontSize: 37,
        color: '#23AFDB',
        fontFamily: 'Ubuntu',
        
    },
})

export default HeaderLogin;