import React, {Component} from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import AppNavigtor from './Components/Navigator'
import AppStore from './Components/AppStore'

export default class App extends Component {
  render() {
    return (
      <Provider store={AppStore}>
        <AppNavigtor />
      </Provider>
    )
  }
}

AppRegistry.registerComponent("ImageSearcg", () => App);
