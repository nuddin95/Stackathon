import React, { Component } from 'react';
import { 
    AppRegistry, 
    Dimensions, 
    TouchableHighlight, 
    Text, 
    View, 
    Platform, 
    StyleSheet, 
    Button,
    ScrollView,
    Image} from 'react-native';
import styles from './Styles.js';
import Camera from 'react-native-camera';
import { Actions, Router, Scene } from 'react-native-router-flux';

export default class CameraView extends Component{
    render(){
        return (
            <View>
                <Button
                onPress={()=> this.setState({camera:!(this.state.camera)})}
                title="Camera"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>
            </View>
        )
    }
    takePicture() {
        const options = {};
        this.camera.capture({metadata: options})
          .then((data) => {
              console.log(data)
              this.picturesRef.push(data)
            })
          .catch(err => console.error(err));
      }
}

AppRegistry.registerComponent('CameraView', () => CameraView);