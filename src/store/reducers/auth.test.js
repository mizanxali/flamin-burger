import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        })
    })

    it('should store token on login', () => {
        expect(reducer(
            {token: null, userId: null, error: null, loading: false},
            {
                type: actionTypes.AUTH_SUCCESS,
                payload: {
                    authData: {
                        idToken: 'some-token',
                        userId: 'some-user-id'
                    }
                }
            })
        ).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false
        })
    })
})