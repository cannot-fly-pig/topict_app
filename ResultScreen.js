import React, {Component} from 'react'
import Sound from 'react-native-sound'
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
   play = () => {
    console.log(this.props.route.params.path)
    const sound = new Sound(this.props.route.params.path,null, (err) => {
      if (err) {
        console.log('failed to load the sound', err)
        return
      }
      console.log("load")
      sound.play()
    })
  }
  render(){
    return(
      <SafeAreaView style={{flex: 1}}>
        <MyHeader />
        <View style={styles.container} >
          <Image 
            style={styles.result_img}
            source={{uri: this.props.route.params.result_source}}
          />
          <Text style={styles.translate_text}>{this.props.route.params.translate}</Text>

          <TouchableOpacity onPress={() => this.play()}>
            <Text style={styles.playButton} >play!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  result_img: {
    width: 280,
    height: 200,
    backgroundColor: "#ffffff",
  },
  translate_text: {
    marginTop: 40,
  },
  playButton:{
    fontSize: 30,
    color: "#ffffff",
    backgroundColor: "#6f72ca",
    padding: 5,
  },
})
