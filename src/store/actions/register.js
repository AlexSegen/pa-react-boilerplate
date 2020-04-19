import { authService } from "../../services/auth.service";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};

const Register = ({first_name, last_name, email, password}) => {

  return (dispatch) => {
    
    dispatch(registerRequest());

    authService.register({first_name, last_name, email, password}).then(res => {
        
        dispatch(registerSuccess(res.data));

    }).catch(error => {
        if (error.data && error.data.data && error.data.data.length > 0) {
          dispatch(registerFailure(error.data.data[0].msg));
          return;  
        }

        dispatch(registerFailure(error.message));
    });

  };
};

export default Register;
