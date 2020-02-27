import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.go_back_wrap}
        >
          <Image 
            style={styles.go_back}
            display={this.props.button ? "" : "none"}
            source={require("./assets/images/go_back_header.png")}
          />
        </TouchableOpacity>
        <Text style={styles.header_text}>topict</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header_main: {
    flexDirection: "row",
    backgroundColor: "#6f72ca",
    alignItems: "center",
    justifyContent: "center"
  },
  header_text: {
    fontSize: 40,
    fontFamily: "FranklinGothic-Heavy",
    marginTop: 15,
    marginBottom: 15,
    color: "white"
  },
  go_back: {
    height: 35,
    width: 35
  },
  go_back_wrap: {
    marginTop: "auto",
    marginBottom: "auto",
    position: "absolute",
    left: 15,
  }
})
