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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';


function Fab(props){
    return (
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#ffffff' title="New Task" onPress={() => console.log("notes tapped!")}>
                    <Icon name="md-create" style={styles.actionButtonIcon1} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#ffffff' title="Notifications" onPress={() => {}}>
                    <Icon name="md-notifications-off" style={styles.actionButtonIcon2} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#ffffff' title="DELETE" onPress={() => {}}>
                    <Icon name="md-trash" style={styles.actionButtonIcon3} />
                </ActionButton.Item>
            </ActionButton>
    )
}

function mapStateToProps(state) {
    return { 
        pictures: state.picReducer
    };
}

export default connect(mapStateToProps)(Fab)