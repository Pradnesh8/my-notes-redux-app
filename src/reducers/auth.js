import * as actions from '../actions/actionTypes';

let initialState = {
    id: "",
    token: "",
    name: "",
    email: "",
    picture: ""
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            localStorage.setItem("user",
                JSON.stringify({
                    id: action.payload.id,
                    token: action.payload.token,
                    name: action.payload.name,
                    email: action.payload.email,
                    picture: action.payload.picture
                })
            );
            return {
                ...state,
                id: action.payload.id,
                token: action.payload.token,
                name: action.payload.name,
                email: action.payload.email,
                picture: action.payload.picture
            }
        case actions.LOGGED_USER:
            if (Object.keys(action.payload).length !== 0) {
                return {
                    ...state,
                    id: action.payload.id,
                    token: action.payload.token,
                    name: action.payload.name,
                    email: action.payload.email,
                    picture: action.payload.picture
                }
            } else {
                return {
                    id: "",
                    token: "",
                    name: "",
                    email: "",
                    picture: ""
                }
            }

        case actions.LOGOUT:
            localStorage.clear();
            sessionStorage.clear();
            return {
                ...state,
                id: "",
                token: "",
                name: "",
                email: "",
                picture: ""
            }
        default:
            return state;
    }
}

export default authReducer
