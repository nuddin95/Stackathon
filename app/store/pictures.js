import firebase from 'firebase';


const firebaseConfig = require('../../firbaseconfig') //CREATE YOUR FIREBASE CONFIG FILE AND EXPORT THE CONFIG OBJECT
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const picturesRef = firebaseApp.database().ref().child('Pictures')

//ACTION TYPES
const GET_PICS = 'GET_PICS';
const ADD_PICS = 'ADD_PICS';

//ACTION CREATORS
export function getPics(pics){
    const action = {type:GET_PICS, payload:pics}
    return action;
}

export function addPics(pics){
    const action = {type:ADD_PICS, payload:pics}
    return action;
}

//THUNK CREATORS
export function fetchPics(){
    return dispatch =>{
        picturesRef.on('value', snapshot => {
            dispatch(getPics(snapshot.val()))
        })
    }
}

export function postPics(picture){
    return dispatch => {
        picturesRef.push(picture)
    }
}

//REDUCER
export default function picReducer(state=[], action){
    switch (action.type) {
        case GET_PICS:
          return action.payload;
        case ADD_PICS:
          return { ...state, ...action.payload };
        // case DELETE_POST:
        //   return _.omit(state, action.payload);
        default:
            return state;
      }
}