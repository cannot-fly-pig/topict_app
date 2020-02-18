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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class MyHeader extends Component {
  render() {
    return(
      <View style={styles.header_main}>
        <View style={styles.text_wrap}>
          <Text style={styles.header_text}>topict</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hearder_main: {
    flex: 1,
    flexDirection: "row",
  },
  text_wrap: {
    alignItems: "center",
    backgroundColor: "#6f72ca",
  },
  header_text: {
    fontSize: 40,
    fontFamily: "FranklinGothic-Heavy",
    marginTop: 15,
    marginBottom: 15,
    color: "white"
  }
})
