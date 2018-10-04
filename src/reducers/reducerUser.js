import { LOGIN, LOGOUT } from '../actions'

//set state to {object} to begin with
// user: true
export default function (state = { loggedIn: false, name: "", email: "", images: [] }, action) {
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                images: action.payload.images
            }
        case LOGOUT:
            return { loggedIn: false }
        default:
            return state;
    }
}
