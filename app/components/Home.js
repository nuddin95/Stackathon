import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import CameraView from './CameraView'
import store, { getPics, fetchPics } from '../store'
import { picturesRef } from '../store/pictures'
import SinglePic from './SinglePic'
import Fab from './Fab'

export default class Home extends Component{
    
    componentDidMount(){
        const pictureThunk = fetchPics()
        store.dispatch(pictureThunk)
    }

    render(){
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        return (
            <View>
                <CameraView />
            </View>
        )
    }
}

AppRegistry.registerComponent('Home', () => Home);