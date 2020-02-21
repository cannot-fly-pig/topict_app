import React, {Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import irasutoya from "./irasutoya.json"
import SuggestImageRow from "./suggest_img_row.js"


export default class SearchScreen extends Component{
  constructor() {
    super()

    this.state={
      kouho: []
    }
  }

  search_word = (text) => {
    let kouho_tmp = irasutoya.filter(function(item,index){
      if (item.name != null && item.name.includes(text)) return true
    })
    let tmp = []
    let kouho = []
    for(let i=0;i<kouho_tmp.length;i++){
      tmp.push(kouho_tmp[i])
      if (tmp.length == 4){
        kouho.push(tmp)
        tmp = []
      }
    }
    console.log("state")
    console.log(this.state.kouho)
    return kouho
  }

  render(){
    const { navigation } = this.props
    let input


    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.form_wrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
          >
            <Text 
              style={styles.go_back}
            >
              go back
            </Text>
          </TouchableOpacity>
          <TextInput 
            style={styles.form}
            ref={e => input = e}
            onChangeText={(text) => this.setState({kouho: this.search_word(text)})}
          >
          </TextInput>
        </View>
        <ScrollView style={styles.suggest_wrap}>
          {(this.state.kouho.slice(0,8)).map((item) => {
            return <SuggestImageRow sources={item} navigation={navigation}/>
          })}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const window_width = Dimensions.get("window").width
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form_wrap: {
    flexDirection: "row"
  },
  suggest_wrap: {
    padding: 15
  },
  go_back: {
    height: 45,
    width: 45,
    left: 15,
    top: 15,
    backgroundColor: "red",
  },
  form: {
    left: 35,
    width: window_width - 120,
    height: 45,
    top: 15,
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingLeft: 10,
  }
})
