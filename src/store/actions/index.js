export const increment = (n = 1) => {
    return {
        type: "INCREMENT",
        payload: n
    }
}

export const decrement = (n = 1) => {
    return {
        type: "DECREMENT",
        payload: n
    }
}

export const signIn = (auth = false) => {
    return {
        type: "SIGN_IN",
        payload: auth
    }
}

export const setProfile = (profile = null) => {
    return {
        type: "SET_PROFILE",
        payload: profile
    }
}