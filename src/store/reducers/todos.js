import { REQUEST_START, REQUEST_SUCCESS, REQUEST_FAILED, GET_TODO, GET_TODOS, CREATE_TODO, UPDATE_TODO } from "../actions/todos"

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

        case UPDATE_TODO:

            const tmp = state.todos;
            const index = tmp.findIndex(item => item.id === action.payload.id);
            tmp[index] = action.payload;

            return {
                ...state,
                loading: false,
                todos: tmp,
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