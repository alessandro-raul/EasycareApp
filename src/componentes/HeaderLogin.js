import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    Image,
} from 'react-native'

class HeaderLogin extends Component{
    render(){
        return(
          <View>
            <View style={styles.header}>
                   <StatusBar backgroundColor="#277AB1" barStyle="light-content" />
                <Text style={styles.text}>Easycare</Text>
            </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    header: {
        marginTop: -15,
        //borderBottomRightRadius: 30,
        //borderBottomStartRadius: 30,
        backgroundColor: '#277AB1',
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text:{
        fontSize: 50,
        color: 'white',
        fontFamily: 'LobsterTwo'
    },
})

export default HeaderLogin;