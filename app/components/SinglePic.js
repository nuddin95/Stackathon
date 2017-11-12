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

function SinglePic (props){
    let singlePic = props.navigation.state.params
    return (
        <View>
            {console.log("THESE ARE PROPS IN SINGLE PICS", singlePic)}
            <View style={styles.ImagePageContainer}>
                <Image source={{uri:singlePic.path}} style={styles.ImagePage} />
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return { 
        pictures: state.picReducer
    };
}

export default connect(mapStateToProps)(SinglePic)