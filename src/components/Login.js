import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import GoogleLogin from 'react-google-login';
import logo from '../assets/My-notes-app-logo.svg'
import { loggedUserMiddleware, loginMiddleware } from '../actions/authActions';
import { useHistory } from 'react-router-dom'
const Login = () => {
    const history = useHistory();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [ErrorMsg, setErrorMsg] = useState("");

    const responseGoogle = (res) => {
        // console.log(res);
        if (res.error) {
            setErrorMsg("Login failed! Please try again.");
        } else {
            const token = res.tokenObj.id_token
            dispatch(loginMiddleware(token));
            history.push("/home");
        }
    }
    return (
        <div className="login">
            <img src={logo} alt="My notes logo" />
            <GoogleLogin
                clientId="539501579105-lqmt4kgbskb7klv341dae4m3j27k63mk.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {ErrorMsg && <div className="errLogin">{ErrorMsg}</div>}
        </div>
    )
}

export default Login
