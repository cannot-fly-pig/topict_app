import React, {Component} from 'react'
import { WebView } from 'react-native-webview'
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
} from 'react-native'

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import MyHeader from "./header.js"
import VerbButton from "./verb_button.js"

export default class App extends Component {
  constructor() {
    super()

    this.state={
      verb: "buy",
      js: "",
    }
  }

  click_verb = (id) => {
    this.setState({verb: id})
  }

  make_img = async (verb,word) => {
    const canvas = require("./canvas.js")
    const res = await axios.get(word, { responseType: "arraybuffer" })
    const word_src = `data:${res.headers["content-type"]};base64,${btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`
    const img_src = canvas.init()
    const verb_src = img_src[verb]
    const js = ` 
      (function(){

        let canvas = document.createElement("canvas")
        canvas.style.border = "thick solid #000000"
        canvas.height = 1000
        canvas.width = 1400
        let ctx = canvas.getContext("2d")
        let flag = 0

        let verb_img = new Image()
        verb_img.onload = () => {
          let w = 500
          let h = verb_img.height * 500 / verb_img.width
          ctx.drawImage(verb_img, 10, 50, w, h)
          flag += 1
          if (flag == 2){
            const result = canvas.toDataURL()
            window.ReactNativeWebView.postMessage(result)
          }
        }
        verb_img.src = "${verb_src}"

        let word_img = new Image()
        word_img.onload = () => {
          let w = 500
          let h = word_img.height * 500 / word_img.width
          ctx.drawImage(word_img, 550, 50, w, h)
          flag += 1
          if (flag == 2){
            const result = canvas.toDataURL()
            window.ReactNativeWebView.postMessage(result)
          }
        }

        word_img.src = "${word_src}"


        document.body.appendChild(canvas)
      })()
    `
    this.setState({js: js})
  }

  render() {
    const buy_src = require("./assets/images/buy_button.png")
    const see_src = require("./assets/images/see_button.png")
    const get_src = require("./assets/images/get_button.png")
    const go_src = require("./assets/images/go_button.png")
    let WebViewRef

    return (
      <View style={styles.container}>
        <MyHeader />
        <View style={styles.textWrap}>
          <Text style={styles.mainText}>I wanna</Text>
        </View>
        <View style={styles.buttonWrap}>
          <VerbButton id="buy" chosen={this.state.verb} onPressIn={() => this.click_verb("buy")} source={buy_src} />
          <VerbButton id="see" chosen={this.state.verb} onPressIn={() => this.click_verb("see")} source={see_src} />
          <VerbButton id="get" chosen={this.state.verb} onPressIn={() => this.click_verb("get")} source={get_src} />
          <VerbButton id="go" chosen={this.state.verb} onPressIn={() => this.click_verb("go")} source={go_src} />
        </View>
        <View style={styles.partsWrap}> 
          <TextInput style={styles.input} />
          <TouchableOpacity onPress={() => {
            this.make_img(this.state.verb, "https://2.bp.blogspot.com/-xobtX6vL4To/VVGVsyZRYTI/AAAAAAAAtoU/GR_M6qNBzkY/s800/medical_kojin_byouin.png") 
            WebViewRef.reload()
            }
          }>
            <Text style={styles.editButton} >Edit!</Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
          originWhitelist={['*']}
          source={{html: '<canvas id="canvas"></canvas>'}}
          injectedJavaScript={this.state.js}
          onMessage={(event) => {
            const {data} = event.nativeEvent
            console.log(data)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  mainText: {
    fontSize: 50,
    fontFamily: "FranklinGothic-Heavy",
    marginTop: 75,
    marginBottom: 20,
    color: "#474747",
  },
  buttonWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  verb_button: {
    width: 75,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto"
  },
  textWrap: {
    alignItems: "center"
  },
  input: {
    marginTop: 80,
    marginBottom: 40,
    height: 60,
    width: 180,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  partsWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  editButton:{
    fontSize: 30,
    color: "#ffffff",
    backgroundColor: "#6f72ca",
    padding: 5,
  },
  chosen: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 5,
  }
});
