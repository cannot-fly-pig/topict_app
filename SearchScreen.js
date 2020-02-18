import React, {Component} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import axios from "axios"
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard
} from 'react-native'

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

export default class SearchScreen extends Component{
  render(){
    const { navigation } = this.props
    let input

    return(
      <SafeAreaView>
        <View style={styles.form_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
        >
          <Text 
            style={styles.go_back}
          >
            go back
          </Text>
        </TouchableOpacity>
          <TextInput 
            style={styles.form}
            ref={e => input = e}
          >
          </TextInput>
        </View>
      </SafeAreaView>
    )
  }
}

const window_width = Dimensions.get("window").width
const styles = StyleSheet.create({
  form_container: {
    flex: 1,
  },
  go_back: {
    height: 45,
    width: 45,
    left: 15,
    top: 15,
    backgroundColor: "red",
  },
  form: {
    left: 75,
    top: 15,
    width: window_width - 90,
    height: 45,
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingLeft: 10,
  }
})
