import React, {Component} from 'react';
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
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MyHeader from "./header.js"
import VerbButton from "./verb_button.js"

export default class App extends Component {
  constructor() {
    super()
    this.state={
      chosen: "buy"
    }
  }

  click_verb = (id) => {
    this.setState({chosen: id})
  }

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
          <VerbButton id="buy" chosen={this.state.chosen} onPress={() => this.click_verb("buy")} source={buy_src} />
          <VerbButton id="see" chosen={this.state.chosen} onPress={() => this.click_verb("see")} source={see_src} />
          <VerbButton id="get" chosen={this.state.chosen} onPress={() => this.click_verb("get")} source={get_src} />
          <VerbButton id="go" chosen={this.state.chosen} onPress={() => this.click_verb("go")} source={go_src} />
        </View>
        <View style={styles.partsWrap}> 
          <TextInput style={styles.input} />
          <TouchableOpacity >
            <Text style={styles.editButton} >Edit!</Text>
          </TouchableOpacity>
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
