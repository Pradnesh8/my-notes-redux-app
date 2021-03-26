import { useDispatch, useSelector } from 'react-redux';
import { BiNotepad } from "react-icons/bi";
import { FiLogOut } from 'react-icons/fi'
import logo from '../assets/My-notes-app-logo.svg'
import { FaRegWindowClose } from "react-icons/fa";
import { logoutMiddleware } from '../actions/authActions';
import { useHistory } from 'react-router';
const Header = ({ onToggle, text }) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    // Logout user
    const logout = () => {
        console.log("logout called");
        dispatch(logoutMiddleware(user.id));
        history.replace("/");
    }
    return (
        <header>
            {/* <h3>My Notes</h3> */}
            <img src={logo} style={{ height: "12vh" }} alt="My notes logo" />
            <div className="profile-section">
                <div className="profile">
                    <img src={user.picture} style={{ borderRadius: "50%", height: "8vh" }} alt="profile photo" />
                    <div>{user.name}</div>
                    <button className="logout-icon" onClick={logout}><FiLogOut style={{ fontSize: "1.2rem" }} /></button>
                </div>
                <button onClick={onToggle}
                    style={{
                        width: "7em",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }} className="btn">
                    {text === 'New' ?
                        (
                            <BiNotepad style={{ fontSize: "1rem" }} />
                        ) :
                        (
                            <FaRegWindowClose style={{ fontSize: "1rem" }} />
                        )}

                    {text}
                </button>
            </div>
        </header>

    )
}

export default Header
