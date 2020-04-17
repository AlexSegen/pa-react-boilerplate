
import { SetUser } from "../../services/storage.service";

const profileReducer = (state = SetUser.getUser(), action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return action.payload
        default:
            return state
    }
    
}

export { profileReducer }