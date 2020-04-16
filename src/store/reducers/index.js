  
import {counterReducer} from './counter'
import {authReducer} from './auth'

import { combineReducers } from 'redux'

const rootReducer = combineReducers( {
    counter: counterReducer,
    isAuth: authReducer
});

export default rootReducer;