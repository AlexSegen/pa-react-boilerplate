import { TokenService } from "../../services/storage.service";

const authReducer = (state = !!TokenService.getToken(), action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return action.payload
        default:
            return state
    }
    
}

export { authReducer }