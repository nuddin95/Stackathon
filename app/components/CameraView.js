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
import { connect } from 'react-redux';
import { postPics } from '../store/pictures'
import Gallery from './Gallery'
import { Actions, Router, Scene } from 'react-native-router-flux';

class CameraView extends Component{
    constructor(props){
        super(props)
        this.state={
            cameraSwitch:false
        }
    }
    render(){
        return (
            <View>
                <Button
                    onPress={() =>this.setState({cameraSwitch:!(this.state.cameraSwitch)}) }
                    title="Camera"
                    color="#000000"
                    accessibilityLabel="Button to turn on and off the camera"
                />

                {this.state.cameraSwitch ? (<View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={styles.capture} onPress={this.props.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>) : false}
                <Gallery />
            </View>
        )
    }


}

function mapStateToProps(state) {
    return { 
        pictures: state.picReducer
    };
  }
function mapDispatchToProps(dispatch){
    return {
        takePicture() {
            const options = {};
            this.camera.capture({metadata: options})
              .then((data) => {
                  console.log("NEW PICTURE", data)
                  dispatch(postPics(data))
                })
              .then(()=> this.setState({cameraSwitch:!(this.state.cameraSwitch)}))  
              .catch(err => console.error(err));
            
          }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CameraView)

// AppRegistry.registerComponent('CameraView', () => CameraView);