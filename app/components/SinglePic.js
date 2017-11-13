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
import { connect } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Fab from './Fab'
import { firebaseApp } from '../store/pictures';

import vision from "react-cloud-vision-api";
vision.init({ auth: "AIzaSyD8Mkq4bTZbGsPARLT2U5NMSyRBlQgXTi8" })
let request;

class SinglePic extends Component{
    constructor(props){
        super(props)
        this.state = {
            url:''
        }
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.singlePic = props.navigation.state.params
    }

    componentDidMount(){
        let storageRef = firebaseApp.storage().ref()
        let imagesRef = storageRef.child(`IMAGE/${this.singlePic.path}`)
        imagesRef.getDownloadURL()
        .then((url) => (
            request = new vision.Request({
                image: new vision.Image({
                  path:this.singlePic.path,
                  url
                }),
                features: [
                  new vision.Feature('LABEL_DETECTION', 10)
                ]
            }) 
        ))
        .then(request => {
            console.log("VISION THINGS FROM GOOGLE", vision)
            return request
        })
        .then(request => vision.annotate(request))
        .then((info) => {console.log("HOPEFULLY INFO FROM GOOGLE", info)})//JSON.stringify(info.responses)
        .catch(e => console.log("GUESS WHAT? HERE IS AN ERROR: ", e))
    }

    render() {

        
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                
                <View style={styles.ImagePageContainer}>
                    <Image source={{uri:this.singlePic.path}} style={styles.ImagePage} />
                </View>
                <Fab />

            </View>
        )
    }
}


function mapStateToProps(state) {
    return { 
        pictures: state.picReducer
    };
}

export default connect(mapStateToProps)(SinglePic)