import ApiService from './api.service'

class AuthenticationError extends Error {
    constructor(errorCode, message, data) {
        super(message)
        this.name = this.constructor.name
        this.data = data;
        this.message = message
        this.errorCode = errorCode
    }
}

const todosService = {
    async getAll() {
        const requestData = {
            method: 'get',
            url: "/todos"
        }
        try {
            const response = await ApiService.customRequest(requestData)
            return response
        } catch (error) {
            if(error.response) {
                throw new AuthenticationError(error.response.status, error.response.data.message, error.response.data)
            }

            throw new Error(error);
        }
    },
    async set(data, id) {
        const requestData = {
            method: id ? 'PUT' : 'POST',
            url: id ? "/todos/" + id : "/todos/",
            data: data
        }

        try {
            const response = await ApiService.customRequest(requestData)

            return response
        } catch (error) {
            if(error.response) {
                throw new AuthenticationError(error.response.status, error.response.data.message, error.response.data)
            }

            throw new Error(error);
        }
    },

}

export default todosService

export {
    todosService,
    AuthenticationError
}