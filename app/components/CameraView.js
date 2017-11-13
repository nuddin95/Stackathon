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
import RNFetchBlob from 'react-native-fetch-blob'
import { Actions, Router, Scene } from 'react-native-router-flux';
import { firebaseApp } from '../store/pictures'

class CameraView extends Component{
    constructor(props){
        super(props)
        this.state={
            cameraSwitch:false
    }
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

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
                  this.props.uploadImage(data.mediaUri, 'image/jpeg', data.path)
                  dispatch(postPics(data))
                })
              .then(()=> this.setState({cameraSwitch:!(this.state.cameraSwitch)}))  
              .catch(err => console.error(err));
            
          },
          uploadImage(uri, mime = 'image/jpeg', name) {
            
              return new Promise((resolve, reject) => {
                let imgUri = uri; let uploadBlob = null;
                const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
                console.log("***********1**********")
                const imageRef = firebaseApp.storage().ref(`IMAGE/${name}`)
            
                RNFetchBlob.fs.readFile(uploadUri, 'base64')
                  .then(data => {
                    return Blob.build(data, { type: `${mime};BASE64` });
                  })
                  .then(blob => {
                    uploadBlob = blob;
                    console.log("***********UPLOADING**********")
                    return imageRef.put(blob, { contentType: mime, name: name });
                  })
                  .then(() => {
                    uploadBlob.close()
                    console.log("***********CLOSING**********")
                    return imageRef.getDownloadURL();
                  })
                  .then(url => {
                    resolve(url);
                    return url
                  })
                  .catch(error => {
                    reject(error)
                })
              })
            }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CameraView)

// AppRegistry.registerComponent('CameraView', () => CameraView);