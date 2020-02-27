import React, {Component} from 'react'
import Sound from 'react-native-sound'
import Share from 'react-native-share'
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
  constructor() {
    super()

    this.state={
      disabled: false
    }
  }

   play = () => {
    this.setState({disabled: true})
    console.log(this.props.route.params.path)
    const sound = new Sound(this.props.route.params.path,null, (err) => {
      if (err) {
        console.log('failed to load the sound', err)
        return
      }
      console.log("load")
      sound.play(() => {
        this.setState({disabled: false})
      })
    })
  }

  render(){
    return(
      <SafeAreaView style={{flex: 1}}>
        <MyHeader button={true} navigation={this.props.navigation} />
        <View style={styles.img_container} >
          <Image 
            style={styles.result_img}
            source={{uri: this.props.route.params.result_source}}
          />
          <View style={styles.container}>
            <Text style={styles.translate_text}>{this.props.route.params.translate}</Text>

            <TouchableOpacity disabled={this.state.disabled} onPress={() => this.play()}>
              <Text style={styles.playButton} >play</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity 
              onPress={async () => {
                Share.open({
                  url: this.props.route.params.result_source,
                  filename: "topict.jpeg",
                  message: this.props.route.params.translate
                })
              }}
            >
              <Text style={styles.playButton} >share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  img_container: {
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
  },
  playButton:{
    fontSize: 25,
    color: "#ffffff",
    backgroundColor: "#6f72ca",
    padding: 5,
    marginLeft: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20
  }
})
