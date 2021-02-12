import * as actionTypes from '../actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    jwtToken: null,
    userId: null,
    error: null,
    loading: null,
    login: null,
    role: null,
}

const authStart = (state, action) => {
    return updatedObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        jwtToken: action.jwtToken,
        userId: action.id,
        error: null,
        loading: false,
        login: action.login,
        role: action.role
    })
}

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updatedObject(state, {
        jwtToken: null,
        userId: null,
        login: null,
        role: null
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;