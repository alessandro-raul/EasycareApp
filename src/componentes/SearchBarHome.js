import React from 'react'
import { Text,   StyleSheet, View, TextInput, TouchableOpacity,} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

export default function SearchBarHome(props){

  return(
    <TouchableOpacity onPress={props.press} style={styles.containerInput}>
      <TouchableOpacity>
        <Icon name="search" size={22} color={'#23AFDB'}/>
      </TouchableOpacity>
      <Text style={styles.input}>Pesquisar</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerInput: {
    width: '100%',
    height: 45,
    alignItems:"center",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: '#666',
    fontSize: 15.4
  },
    
})
