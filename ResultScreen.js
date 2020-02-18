import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'

import MyHeader from "./header.js"

export default class ResultScreen extends Component{
  render(){
    return(
      <SafeAreaView>
        <MyHeader />
        <View style={styles.container} >
          <Image 
            style={styles.result_img}
            source={{uri: this.props.route.params.result_source}}
        />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  result_img: {
    width: 280,
    height: 200,
    top: 200,
    backgroundColor: "#ffffff",
  }
})
