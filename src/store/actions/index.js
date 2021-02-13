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
