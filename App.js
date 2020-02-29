import React, {Component} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'

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
  componentDidMount() {
    SplashScreen.hide()
  }
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
