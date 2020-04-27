import React from 'react'
import { Text,   StyleSheet, View, TextInput, TouchableOpacity,} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar(){

  return(
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholderTextColor="#666" placeholder="Pesquisar"></TextInput>
        <TouchableOpacity>
        <Icon name="search" size={24}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height: 60,
    paddingHorizontal: 32,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor:"#fff",

    elevation: 1,
    shadowOffset: { width: 3, height: 1 },
    shadowColor: '#3977A0',
    shadowOpacity: 0.3,
  },

  containerInput: {
    width: '100%',
    height: 40,
    alignItems:"center",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(70,70,70,0.1)',
  },

  input: {
    flex: 1,
  },
    
})
