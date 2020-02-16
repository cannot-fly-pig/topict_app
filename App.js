import React, {Component} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
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
import MainScreen from "./MainScreen.js"
import ResultScreen from "./ResultScreen.js"
import SearchScreen from "./SearchScreen.js"

const Stack = createStackNavigator()

function Main_Result() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  )
}

const Search = createStackNavigator()

export default class App extends Component {
  render() {
    return (
      <NavigationContainer >
        <Search.Navigator headerMode="none" mode="modal">
          <Search.Screen name="Main" component={Main_Result} />
          <Search.Screen name="Search" component={SearchScreen} />
        </Search.Navigator>
      </NavigationContainer>
    );
  }
}
