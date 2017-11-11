import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'row',
    // },
    // preview: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center'
    // },
    capture: {
        flex:0,
        backgroundColor: '#000',
        borderRadius: 5,
        color: '#fff',
        padding: 10,
        marginTop: 350,
        margin:0
    },
    allImages:{
        flex:0,
        marginTop:5,
        flexWrap:"wrap",
        justifyContent: 'space-between',
        flexDirection:"row"
    },
    SingleImage:{
        width: 100, 
        height: 100,
        margin:1,
        borderRadius:5
    },
    SingleImagePressed:{
        width: 150, 
        height: 150,
        margin:1,
        borderRadius:5
    }
  });

  export default styles;