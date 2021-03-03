import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData: authData
        }
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        payload: {
            error: error
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
        if(!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
        }

        axios.post(url, authData)
        .then(res => {

            //localStorage stuff
            localStorage.setItem('token', res.data.idToken)
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', res.data.localId)

            dispatch(authSuccess({
                idToken: res.data.idToken,
                userId: res.data.localId
            }))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFailure(err.response.data.error))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate>new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess({
                    idToken: token,
                    userId: userId,
                }))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            } else {
                dispatch(logout())
            }
        }
    }
}