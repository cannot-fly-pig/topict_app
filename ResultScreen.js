import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import MyHeader from "./header.js"

export default class ResultScreen extends Component{
  render(){
    console.log("result")
    console.log(this.props.route.params.result_source)
    return(
      <View>
        <MyHeader />
        <View style={styles.container} >
          <Image 
            style={styles.result_img}
            source={{uri: this.props.route.params.result_source}}
        />
        </View>
      </View>
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
