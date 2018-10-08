import { LOGIN, LOGOUT } from '../actions'

//set state to {object} to begin with
// user: true
// loggedIn: false, name: "", email: "", userContent: []
export default function (state = {}, action) {
    switch (action.type) {

        case LOGIN:
            const newState = {
                loggedIn: true,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                emailVerified: action.payload.emailVerified,
                userContent: action.payload.userContent}
            return newState
        case LOGOUT:
            return {}
        default:
            return state;
    }
}
