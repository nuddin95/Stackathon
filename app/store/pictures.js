import { firebaseApp } from './index'

const picturesRef = firebaseApp.database().ref().child('Pictures');
const pics = [];

picturesRef.on('value', (pic)=>{
    pic.forEach(child => {
      pics.push({
        _key:child.key,
        mediaUri: child.val().mediaUri,
        path:child.val().path
      })
    })
})

//ACTION TYPES
const GET_PICS = 'GET_PICS';
const ADD_PICS = 'ADD_PICS';

//ACTION CREATORS
export function getPics(pictures){
    const action = { type:GET_PICS, pictures }
    return action;
}

export function addPics(pictures){
    const action = { type:ADD_PICS, pictures }
    return action;
}

//THUNK CREATORS
export function fetchPics(){
    return function thunk(dispatch){
        const action = getPics(picturesRef);
        dispatch(action);
    }
}

export function postPics(picture){
    return function thunk(dispatch){
        picturesRef.push(picture);
        const action = addPics(picture)
        dispatch(action)
    }
}

// REDUCER
export default function reducer (state = picturesRef, action) {
    
      switch (action.type) {
    
        case GET_PICS:
          return action.pictures;
    
        case ADD_PICS:
          return [...state, action.pictures];
    
        default:
          return state;
      }
    
    }