import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MyHeader from "./header.js"

export default class App extends Component {
  render() {
    const buy_src = require("./assets/images/buy_button.png")
    const see_src = require("./assets/images/see_button.png")
    const get_src = require("./assets/images/get_button.png")
    const go_src = require("./assets/images/go_button.png")

    return (
      <View style={styles.container}>
        <MyHeader />
        <View style={styles.textWrap}>
          <Text style={styles.mainText}>I wanna</Text>
        </View>
        <View style={styles.buttonWrap}>
          <Image style={styles.verb_button} source={buy_src} />
          <Image style={styles.verb_button} source={see_src} />
          <Image style={styles.verb_button} source={get_src} />
          <Image style={styles.verb_button} source={go_src} />
        </View>
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
    fontSize: 60,
    fontFamily: "FranklinGothic-Heavy",
    marginTop: 40,
    marginBottom: 40,
    color: "#474747",
  },
  buttonWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  verb_button: {
    width: 75,
    height: 120,
  },
  textWrap: {
    alignItems: "center"
  }
});
