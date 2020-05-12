import { todosService } from "../../services/todos.service";

export const REQUEST_START = "REQUEST_START";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_FAILED = "REQUEST_FAILED";

export const GET_TODOS = "GET_TODOS";
export const GET_TODO = "GET_TODO";
export const CREATE_TODO = "CREATE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const startRequest = () => {
  return {
    type: REQUEST_START
  };
};

export const requestFailure = (error) => {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
};

export const getAllSuccess = (payload) => {
    return {
      type: GET_TODOS,
      payload: payload
    };
};

export const createSuccess = (payload) => {
  return {
    type: CREATE_TODO,
    payload: payload
  };
};

export const updateSuccess = (payload) => {
    return {
      type: UPDATE_TODO,
      payload: payload
    };
};

export const removeSuccess = (payload) => {
  return {
    type: DELETE_TODO,
    payload: payload
  };
};


const getAll = () => {
  return (dispatch) => {
    
    dispatch(startRequest());

    todosService.getAll().then(res => {
        
        dispatch(getAllSuccess(res.data));

    }).catch(error => {
        dispatch(requestFailure(error.message));
    });

  };
};

const createItem = (payload) => {
  return (dispatch) => {
    
    dispatch(startRequest());

    todosService.set(payload).then(res => {
        
        dispatch(createSuccess(res.data));

    }).catch(error => {
        dispatch(requestFailure(error.message));
    });

  };
};

const updateItem = (payload) => {
  return (dispatch) => {
    
    dispatch(startRequest());

    todosService.set(payload, payload.id).then(res => {
        
        dispatch(updateSuccess(res.data));

    }).catch(error => {
        dispatch(requestFailure(error.message));
    });

  };
};

const removeItem = (payload) => {
  return (dispatch) => {
    
    dispatch(startRequest());

    todosService.remove(payload.id).then(() => {
        
        dispatch(removeSuccess(payload));

    }).catch(error => {
        dispatch(requestFailure(error.message));
    });

  };
};

export { getAll, createItem, updateItem, removeItem };
