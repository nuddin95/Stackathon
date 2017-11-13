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


function SinglePic (props){
    console.ignoredYellowBox = [
        'Setting a timer'
    ];
    let singlePic = props.navigation.state.params
    return (
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>

            <View style={styles.ImagePageContainer}>
                <Image source={{uri:singlePic.path}} style={styles.ImagePage} />
            </View>
            <Fab />
        </View>
    )
}

function mapStateToProps(state) {
    return { 
        pictures: state.picReducer
    };
}

export default connect(mapStateToProps)(SinglePic)