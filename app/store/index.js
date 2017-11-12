import { createStore, combineReducers, applyMiddleware } from 'redux';
import picReducer from './pictures'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    picReducer
})

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  )))
export default store
export * from './pictures'

