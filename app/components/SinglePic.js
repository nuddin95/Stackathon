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
vision.init({ auth: 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAlU0lqfTwxBVz\ncquJ2mq7BKcytxO6rxUWZLAxsF+aEp7NLIR1OTwyBBijsbJyXiHVySGnK8q92/Gz\nYdRYAHuZ8eElVAuCLsRrnJaDw4qpAFdAr24L4fk/Z3zY+8RgahhlxtI+iEuswN9+\nf/KdCcSDYfPoy5qz3uPwxAJA1GOUL1FDenUdSEZYhGtGwxTh+eqika/SqJdnbyA4\nkwpnbXw7JENsT4VtxI423XLDjsUDdKgRawK5X2jLTE/qYAFbfTRLM6YwuFgA6Ule\n2fuwuTg7Xmc0KjqdPDiWxiogxFgG4rK8jDs4BXWPwRYpEIBKmpZwmX5S95KPVVHm\nhZYf5UjnAgMBAAECggEAVoi/yZS8wxLYsK9t9Nt36eEFX/xzmQbi6tUDdtBRpOGJ\nCZhfTG0TZ0X/7E4EaO9zNKTTwlIjH3yc9oWW7JQK9fmBuUwyf6SUDeammz5aJ+ZH\nToGFaUF4xcyyhK1caBZEMDdOcVq85jskMas8UOP6sS5qcshKE1isA5uPh6HnvMVe\nl6S/i5qTjMWgq+URHreaX4Fi3AAJsaZzuSvZicTDwd73IqGEcT8ZH7nVnkzZBWJt\nHgTtqMjuRMyNHASDgYCrkSpca0ljCfNo5CNUT4Tfbfkd4lCJOqOl0D+RNoi+ohlW\nRX3bEe20xaeSzvJyTeDjIs6V0Kt7VX4htpjcU8f5gQKBgQDkVvvvnv+GBJIKqlYz\ny9ZhUbkZxqGFNicWCjP9W2p38ImrMXEEFqEvSI/vAQ6JGlReMYSTO+sHrNME1cJf\nmmu39wU1ntXjP24kXqvuWyUK3jQeXC3AGdYZkPPXXnSfvbimXkB0ry2yWqtvoizn\nTdr/q013pHu5H63+GecQ/4wCqQKBgQDX6XmFa7JmRWbAJ4mguSYrb59UNZdUhmei\n+kjpY+7ercDWHL/7gl19rjmT9oAIAnsGV1zpE6/ZhgD2KNbxMX0HnTkZ74NUzhUY\narArWoGeEuKMe4DdLAGfcOBKFQ30I/UNASM5orUR+WBFCSxVCagBAV66iOrhSVIj\n1zzIMr25DwKBgGHNnDXDzcDynjcxRKEE8ztWDMmsmax8SHuZPTGNAWqEPgN0turA\nYqPlGbmOo1I4U+DQpu+Fn6L29J/Ci3H1q6Pti26vLQAcQCoV3uDGa3RfPsWuR+5b\nYqgqvTcHfz6YvcmM32DbU+BsE7hKJ5+famlOT20qp8/gcN9A6wcN3kOZAoGBAI5S\nmIgaNb60gMapSU9ovIBlU+FuchKFhksoMGeoOA0Q+8wnp2Viyb3O2qVuF3cwK2hC\nrjv1fjUk3/1jbkwPExuxx7IQ78E3FzDBIt9xCX/pcuynfIpON8Oh5DbxKgGEskOg\nPFgBqNnwSEU5hr+HXfdLr+XF2w4mBr8ZYjeVOvqBAoGAKQrcORxrcbW3wP95y99s\nRLcWWuykk69jWYhlYQXT7BxGQZnBOshhVARCJLgcshPegJAXLHKcln3srOzBlB9n\nD/JSOHF4Iyv0C4KPx2GR5rN07zBQlOeF+zP3u4qBhwhdPdth0x444undygjKV/p5\ntIi0lFYEr5ItFNTS28GyCGE='})


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
        .then((url) => {
            let fileName = url;
            let request = new vision.Request({
                image: new vision.Image({
                  url
                }),
                features: [
                  new vision.Feature('TEXT_DETECTION', 4),
                  new vision.Feature('LABEL_DETECTION', 10),
                ]
              })
            vision.annotate(request)
            .then(info => console.log("GOOOEL INFO HOPEFULLY", JSON.stringify(info.responses)))
        })
        
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