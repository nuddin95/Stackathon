/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import Home from './app/components/Home'
import { Actions, Router, Scene } from 'react-native-router-flux';

export default class app extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={ Home }/>
        </Scene>
      </Router>
    );
  }
};

AppRegistry.registerComponent('app', () => app);
