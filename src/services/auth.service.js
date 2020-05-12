import ApiService from './api.service'
import {
    TokenService,
    SetUser
} from './storage.service'




class AuthenticationError extends Error {
    constructor(errorCode, message, data) {
        super(message)
        this.name = this.constructor.name
        this.data = data;
        this.message = message
        this.errorCode = errorCode
    }
}

const handleErrors = errors => {
    let error = errors.length > 0 ? errors[0] : { message: "Error Unknown" };

    if(error.messages && error.messages.length > 0) {
        error = error.messages[0];
    }
    
    return error.message;
}

const authService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
     **/
    login: async function (email, password) {
        const requestData = {
            method: 'post',
            url: "/auth/local",
            data: {
                identifier: email,
                password: password
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.jwt);
            TokenService.saveRefreshToken(response.data.jwt)
            SetUser.saveUser(response.data.user);

            ApiService.setHeader()

            // NOTE: We haven't covered this yet in our ApiService 
            //       but don't worry about this just yet - I'll come back to it later
            //ApiService.mount401Interceptor();

            return response.data
        } catch (error) {
            if(error.response && error.response.data) {
                throw new AuthenticationError(error.response.status, handleErrors(error.response.data.message), error.response.data);
            }
            throw new AuthenticationError(error.response.status, error.response.data.message, error.response.data)
        }
    },

    /**
     * Register the user and redirects to Login Page. 
     * 
     * @throws AuthenticationError 
     **/
    register: async function (payload) {
        const requestData = {
            method: 'post',
            url: "/auth/register/",
            data: payload
        }

        try {
            const response = await ApiService.customRequest(requestData)

            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message, error.response.data)
        }
    },

    /**
     * Updates the user and stores to SetUser. 
     * 
     * @returns user
     * @throws AuthenticationError 
     **/
    updateProfile: async function (payload) {
        const requestData = {
            method: 'put',
            url: "/auth/profile",
            data: payload
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            SetUser.removeUser();
            SetUser.saveUser(response.data.data);
            
            return response.data.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Upload image. 
     * 
     * @returns image url
     * @throws AuthenticationError 
     **/
    updateAvatar: async function (image, userId) {
        const requestData = {
            method: 'post',
            url: "/upload/update-avatar/" + userId,
            data: image
        }

        try {
            const response = await ApiService.customRequest(requestData)

            SetUser.removeUser();
            SetUser.saveUser(response.data.data);
            
            return response.data.data

        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Updates profile password. 
     * 
     * @returns message
     * @throws AuthenticationError 
     **/
    updateProfilePassword: async function (payload) {
        const requestData = {
            method: 'put',
            url: "/auth/update-password/",
            data: payload
        }

        try {
            const response = await ApiService.customRequest(requestData)
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Recover the user password. Send new password to provided email
     * 
     * @returns message
     * @throws AuthenticationError 
     **/
    recoverPassword: async function (payload) {
        const requestData = {
            method: 'post',
            url: "/auth/reset-password/",
            data: {
                email: payload
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Recover the user password. Send new password to provided email
     * 
     * @returns message
     * @throws AuthenticationError 
     **/
    sendRecoveryEmail: async function (payload) {
        const requestData = {
            method: 'post',
            url: "/auth/recovery-email/",
            data: payload
        }

        try {
            const response = await ApiService.customRequest(requestData)
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Recover the user password. Send new password to provided email
     * 
     * @returns message
     * @throws AuthenticationError 
     **/
    changePassword: async function ({password, token}) {
        const requestData = {
            method: 'post',
            url: "/auth/change-password/",
            data: {
                password: password,
                token: token
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Recover the user password. Send new password to provided email
     * 
     * @returns token content
     * @throws AuthenticationError 
     **/
    checkToken: async function (payload) {
        const requestData = {
            method: 'get',
            url: "/auth/check-token?token=" + payload,
        }
        try {
            const response = await ApiService.customRequest(requestData)
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Refresh the access token.
     **/
    refreshToken: async function () {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'post',
            url: "/o/token/",
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
            auth: {
                username: process.env.VUE_APP_CLIENT_ID,
                password: process.env.VUE_APP_CLIENT_SECRET
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.access_token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            // Update the header in ApiService
            ApiService.setHeader()

            return response.data.access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }

    },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
     **/
    logout() {
        // Remove the token and remove Authorization header from Api Service as well 
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        ApiService.removeHeader()

        SetUser.removeUser();

        // NOTE: Again, we'll cover the 401 Interceptor a bit later. 
        //ApiService.unmount401Interceptor()

    }
}

export default authService

export {
    authService,
    AuthenticationError
}