import React, {Component} from 'react'
import { WebView } from 'react-native-webview'
import RNPickerSelect from 'react-native-picker-select'
import * as RNFS from 'react-native-fs'
import axios from "axios"
import { Buffer } from 'buffer/'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Picker
} from 'react-native'

import MyHeader from "./header.js"
import VerbButton from "./verb_button.js"
import translate from "./translate.js"
import getToken from "./token.js"
import speech from "./speech.js"
import init from "./canvas.js"

export default class MainScreen extends Component{
  constructor() {
    super()

    this.state={
      verb: "buy",
      js: "",
      lang: "en"
    }
  }

  click_verb = async (id) => {
    this.setState({verb: id})
    console.log(this.props)
  }

  make_img = async (verb,word,WebViewRef) => {
    const res = await axios.get(word, { responseType: "arraybuffer" })
    const image = Buffer.from(res.data).toString('base64');
    const word_src = `data:${res.headers['content-type'].toLowerCase()};base64,${image}`
    const img_src = init()
    const verb_src = img_src[verb]
    const js = ` 
      (function(){

        let canvas = document.createElement("canvas")
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


      })()
    `
    this.setState({js: js})
    WebViewRef.reload()
  }

  render() {
    const buy_src = require("./assets/images/buy_button.png")
    const see_src = require("./assets/images/see_button.png")
    const get_src = require("./assets/images/get_button.png")
    const go_src = require("./assets/images/go_button.png")
    let WebViewRef
    const { navigation } = this.props

    return (
      <SafeAreaView style={styles.container}>
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
          <TextInput 
            style={styles.input}
            onFocus={
              (event) => {
                navigation.navigate("Search")
              }
            }
            value={this.props.route.params ? this.props.route.params.word : "画像を選んでください"}
          />

          <RNPickerSelect
            onValueChange={(value) => this.setState({lang: value})}
            style={styles}
            value={this.state.lang}
            items={[
                { label: "英語", value: "en" },
                { label: "中国語", value: "zh" },
                { label: "韓国語", value: "ko" },
                { label: "スペイン語", value: "es" },
                { label: "フランス語", value: "fr" },
                { label: "インドネシア語", value: "id" },
                { label: "ベトナム語", value: "vi" },
                { label: "タイ語", value: "th" },
                { label: "ミャンマー語", value: "my" },
            ]}
          />

          <TouchableOpacity onPress={async () => {
            this.make_img(this.state.verb, this.props.route.params.word_src,WebViewRef)
            }
          }>
            <Text style={styles.editButton} >Edit!</Text>
          </TouchableOpacity>
        </View>
        <View>
          <WebView
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            originWhitelist={['*']}
            injectedJavaScript={this.state.js}
            onMessage={async (event) => {
              const {data} = event.nativeEvent
              console.log(data)
              const token = await getToken()
              let verb_ja
              if (this.state.verb == "buy") verb_ja = "が買いたいです"
              else if (this.state.verb == "go") verb_ja = "に行きたいです"
              else if (this.state.verb == "get") verb_ja = "が欲しいです"
              else if (this.state.verb == "see") verb_ja = "が見たいです"
              const text = `私は${this.props.route.params.word}${verb_ja}`
              const translated = await translate(token,text,"ja",this.state.lang)
              const res = await speech(token,translated.data[0],this.state.lang)
              console.log(res)
              let tmp = Buffer.from(res.data).toString('base64');
              const speech_src = `data:${res.headers['content-type'].toLowerCase()};base64,${tmp}`
              const path = `file://${RNFS.DocumentDirectoryPath}/speech.wav`;
              await RNFS.writeFile(path, speech_src, 'base64')
              console.log(speech_src)
              navigation.push("Result",{result_source: data, translate: translated.data[0], path: path})
            }}
          />
        </View>
      </SafeAreaView>
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
    marginTop: 40,
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
    marginTop: 40,
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
  },
  picker: {
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  inputIOS: {
    color: "#000000",
    backgroundColor: "#ffffff",
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 30,
    height: 60,
      
  },
});
