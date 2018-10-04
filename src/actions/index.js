// import { db } from '../firebase';
// import uuidv1 from "uuid/v1"

export const LOGIN = 'LOGIN'
export const FETCH_DATA = 'FETCH_DATA'
export const LOGOUT = 'LOGOUT'
export const GET_USER_DATA = 'GET_USER_DATA'

export function logInAC(snapshot) {

    // let contentArray = [];
    // if (snapshot.userContent) {
    //     const contentObj = snapshot.userContent
    //     Object.keys(contentObj).map((key) => {
    //         contentArray.push(contentObj[key].url)
    //         return contentArray
    //     })
    // }

    //make data ob with images array
    const data = {
        id: snapshot.id,
        name: snapshot.username,
        email: snapshot.email,
        // userContent: contentArray
    }

    return {
        type: LOGIN,
        payload: data
    }
}

export function logOutAC() {
    return {
        type: LOGOUT
    }
}
