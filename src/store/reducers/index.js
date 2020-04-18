  
import { combineReducers } from 'redux'

import {counterReducer} from './counter'
import {authReducer} from './auth'

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
});

export default rootReducer;