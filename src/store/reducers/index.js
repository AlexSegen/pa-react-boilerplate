  
import {counterReducer} from './counter'
import {authReducer} from './auth'
import { profileReducer } from './profile'

import { combineReducers } from 'redux'

const rootReducer = combineReducers( {
    counter: counterReducer,
    isAuth: authReducer,
    profile: profileReducer
});

export default rootReducer;