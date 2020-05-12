  
import { combineReducers } from 'redux'

import {counterReducer} from './counter'
import {authReducer} from './auth'
import {registerReducer} from './register'
import { todosReducer } from './todos';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer,
    todos: todosReducer
});

export default rootReducer;