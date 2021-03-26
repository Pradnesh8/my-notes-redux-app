import * as actions from "./actionTypes";
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const login = (payload) => {
    return { type: actions.LOGIN, payload }
};

export const loggedUser = (payload) => {
    return { type: actions.LOGGED_USER, payload }
};

export const logout = (payload) => {
    return { type: actions.LOGOUT, payload }
};

// Middleware to call api using Async/await 

export const loginMiddleware = (user_token) => async (dispatch, getState) => {
    // ADD user to Json-server using axios
    try {
        // const token = res.tokenObj.id_token
        const token = user_token;
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        let user_info = decodedToken;
        /*
          If is a valid jwt, 'decodedToken' will be a object
          it could look like:
          {
            "name": "Gustavo",
            "iat": 1596408259,
            "exp": 4752168259
          }
        
          'isExpired' will return a boolean
          true => your token is expired
          false => your token is not expired
        */
        // Get user from localStorage
        let user = localStorage.getItem("user")

        if (user_info.exp > Date.now() / 1000) {
            // Token is not expired
            const res = await axios.post('http://localhost:5000/User', {
                token: user_token,
                name: user_info.name,
                email: user_info.email,
                picture: user_info.picture
            });
            // const data = await res.json();
            const data = res.data;
            console.log("User Logged in", data);
            dispatch(login(data));
            console.log("State of User after Logged in", getState());
        } else {
            // Token is expired
            dispatch(logout(user.id));
            console.log("Token is expired");
        }
    } catch (err) {
        console.log(err);
    }
}

export const loggedUserMiddleware = () => async (dispatch, getState) => {
    let user = JSON.parse(localStorage.getItem("user"));
    // GET user from Json-server using axios
    try {
        if (user) {
            const res = await axios.get(`http://localhost:5000/User/${user.id}`)
            // const data = await res.json();
            const data = res.data;
            console.log("User already Logged in", data);
            dispatch(loggedUser(data));
            console.log("State of User already Logged in", getState());
        } else {
            dispatch(loggedUser({}));
        }
    } catch (err) {
        console.log(err);
    }
}

export const logoutMiddleware = (id) => async (dispatch, getState) => {
    // DELETE user from Json-server using axios
    try {
        const res = await axios.delete(`http://localhost:5000/User/${id}`)
        // const data = await res.json();
        const data = res.data;
        console.log("User Logged out", data);
        dispatch(logout(id));
        console.log("State of User after Logged out", getState());
    } catch (err) {
        console.log(err);
    }
}
