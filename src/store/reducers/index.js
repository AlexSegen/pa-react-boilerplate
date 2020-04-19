  
import { combineReducers } from 'redux'

import {counterReducer} from './counter'
import {authReducer} from './auth'
import {registerReducer} from './register'

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer
});

export default rootReducer;