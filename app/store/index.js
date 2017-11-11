import {
    createStore,
    applyMiddleware,
    combineReducers
    } from 'redux';
import pictures from './pictures'
import * as firebase from 'firebase';

const firebaseConfig ={
  apiKey: "AIzaSyCa3bPLTfp84fXJ5zUBeI6fyvgyqfKfNYU",
  authDomain: "stackathon-17f9d.firebaseapp.com",
  databaseURL: "https://stackathon-17f9d.firebaseio.com",
  projectId: "stackathon-17f9d",
  storageBucket: ""
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

const reducer = combineReducers({
    pictures
})

const store = createStore(reducer)

export default store;
export * from './pictures';

