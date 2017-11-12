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

function Gallery(props){
    let pics=[];
    for(key in props.pictures){
        pics.push(props.pictures[key])
    }
    console.log("THESE ARE ALL THE PICS",pics)
    return (
        <ScrollView>
            <Text>{pics.length}</Text>
            <Text>GALLERY</Text>
            <View style = {styles.allImages}>
                {
                    pics.map((pic, ind) => 
                        (
                            <View key={ind}>
                                {console.log("SINGLE PICTURE", pic)}
                                <TouchableHighlight onPress={()=> Actions.SinglePic(pic)}>
                                    <Image
                                        style={styles.SingleImage}
                                        source={{uri:pic.path}}
                                    />
                                </TouchableHighlight>
                            </View>
                        )
                    )
                }
            </View>
        </ScrollView>
    )
}

function mapStateToProps(state) {
    return { 
        pictures: state.picReducer
    };
}

export default connect(mapStateToProps)(Gallery)