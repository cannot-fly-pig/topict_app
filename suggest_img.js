
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'


export default class SuggestImage extends Component{
  render(){
    return(
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home",{word_src: this.props.source})}>
          <Image
            style={styles.image}
            source={{uri: this.props.source}}
          >
          </Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  }
})
