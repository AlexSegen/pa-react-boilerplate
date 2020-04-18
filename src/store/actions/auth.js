import { authService } from "../../services/auth.service";
import { TokenService, SetUser } from "../../services/storage.service";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const logout = () => {
    return {
        type: LOGOUT
    };
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

const Auth = (email, password) => {

  return (dispatch) => {
    
    dispatch(loginRequest());

    authService.login(email, password).then(res => {
        
        TokenService.saveToken(res.data.token);
        TokenService.saveRefreshToken(res.data.token)
        SetUser.saveUser(res.data);

        dispatch(loginSuccess(res.data));

    }).catch(err => {
        console.log('Error', err.message);
        dispatch(loginFailure(err.message));
    });

  };
};

export default Auth;
