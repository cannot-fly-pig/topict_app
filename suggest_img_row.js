import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

import SuggestImage from "./suggest_img.js"

export default class SuggestImageRow extends Component{
  render(){
    return(
      <View style={styles.container}>
        {this.props.sources.map((item) => {
          return <SuggestImage source={item.thumbnail} item = {item} word={this.props.word} navigation={this.props.navigation} />
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 20,
    paddingRight: 20
  }
})
