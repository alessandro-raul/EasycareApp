import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class InputComIcon extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={styles.inputContainer}>
        <TouchableWithoutFeedback>
          <Icon style={styles.icon} name={this.props.icon} size={20} color="#666" />
        </TouchableWithoutFeedback>
        <TextInput
          style={[styles.input, this.props.style]}
          placeholderTextColor="#666"
          {...this.props}>
        </TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderColor: 'rgba(70,70,70, 0.55)',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    marginTop: 25,
    flexDirection: 'row'
  },

  icon: {
    alignSelf: 'center',
    paddingRight: 20
  },

  input: {
    fontSize: 14,
    color: '#666',
    flex: 1
  }
})