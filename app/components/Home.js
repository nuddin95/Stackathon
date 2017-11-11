import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import CameraView from './CameraView'

export default class home extends Component{
    render(){
        return (
            <View>
                <CameraView />
            </View>
        )
    }
}

AppRegistry.registerComponent('home', () => home);