import { USER_AUTHENTICATE, USER_LOGOUT, USER_SIGNIN, USER_SIGNUP } from '../action/index';

const initialState = {
    initialUserState: {
        user: {},
        isLoggedIn: false,
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP:
            return {
                user: action.value,
                isLoggedIn: true
            }
        case USER_AUTHENTICATE:
            return {
                user: action.value,
                isLoggedIn: true
            }
        case USER_LOGOUT:
            return {
                user: {},
                isLoggedIn: false
            }
        default: return state;
    }
}