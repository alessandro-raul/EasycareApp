import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'

import icon from '../../assets/imgs/icon.png';

class Header extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>EasyCare</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS ==="ios"? 20 : 0,
        padding: 10,
       
        backgroundColor: '#277AB1'
    },

    rowContainer: {
        //flexDirection: "row",
        alignItems: 'center'
    },

    image: {
        height: 20,
        width:30,
        resizeMode: 'contain'
    },

    title: {
        color: '#fff',
        fontSize: 27,
        fontFamily: 'LobsterTwo'
    }
})

export default Header;