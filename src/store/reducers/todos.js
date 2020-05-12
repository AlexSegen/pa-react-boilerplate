import { REQUEST_START, REQUEST_SUCCESS, REQUEST_FAILED, GET_TODO, GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "../actions/todos"

const initialState = {
    loading: false,
    todo: null,
    todos: null,
    error: null
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_START:
            return {
                ...state,
                loading: true
            }
        case GET_TODOS:
            return {
                ...state,
                loading: false,
                todos: action.payload,
                error: null
        }
        case GET_TODO:
            return {
                ...state,
                loading: false,
                todo: action.payload,
                error: null
        }

        case CREATE_TODO:
            return {
                ...state,
                loading: false,
                todos: [...state.todos, action.payload],
                error: null
        }

        case DELETE_TODO:

            let tmp = state.todos;
            tmp.splice(tmp.findIndex(item => item.id === action.payload.id), 1);

            return {
                ...state,
                loading: false,
                todos: tmp,
                error: null
        }

        case UPDATE_TODO:

            const upt = state.todos;
            upt[upt.findIndex(item => item.id === action.payload.id)] = action.payload;

            return {
                ...state,
                loading: false,
                todos: upt,
                error: null
        }
        
        case REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload,
                error: null
        }
        case REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                todos: null,
                error: action.payload
            }
        default:
            return state
    }
}