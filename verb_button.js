import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class VerbButton extends Component {
  render() {
    let chosen = this.props.chosen == this.props.id ? styles.chosen : null
    return(
      <TouchableOpacity style={styles.buttonWrap} onPress={this.props.onPress}>
        <Image style={[styles.verb_button,chosen]} source={this.props.source} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  verb_button: {
    width: 75,
    height: 120,
  },
  buttonWrap: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  chosen: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 5,
  }
})
