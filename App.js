
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import Home from './app/components/Home';
import SinglePic from './app/components/SinglePic'
import { Provider } from 'react-redux';
import store from './app/store'
import { Actions, Router, Scene } from 'react-native-router-flux';

export default class app extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={ Home } title="Smart Gallery"/>
            <Scene key="SinglePic" component={SinglePic} />
          </Scene>
        </Router>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('app', () => app);
