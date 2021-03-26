import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Notelist from './components/Notelist';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AddNote from './components/AddNote';
import { fetchNotesMiddleware } from "./actions/notesActions";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { loggedUserMiddleware } from './actions/authActions';
import Login from './components/Login';
import { AiOutlineFileSearch } from 'react-icons/ai'

function App() {
  const user = useSelector(state => state.user)
  const retrieved_notes = useSelector(state => state.notes);
  const [AddNoteToggle, setAddNoteToggle] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // To check if user is already logged in
    dispatch(loggedUserMiddleware());
    // TO call fetchNotes action
    // dispatch(fetchNotesMiddleware());
  }, [dispatch])

  useEffect(() => {
    console.log(user)
    if (user.id !== "")
      // TO call fetchNotes action
      dispatch(fetchNotesMiddleware());
  }, [user])

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user === null && window.location.pathname !== "/") {
      window.location.href = "/"
    }
    if (user !== null && window.location.pathname !== "/home") {
      window.location.href = "/home"
    }
  }, [user])
  // add note using React-redux 
  const toggleAddNote = () => {
    // Data is already added using middleware
    // To toggle the form
    setAddNoteToggle(!AddNoteToggle);
    console.log("Add note form called");
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home">
            <div className="App">
              <Header onToggle={() => setAddNoteToggle(!AddNoteToggle)} text={AddNoteToggle ? 'Close' : 'New'} />
              <h1>Welcome to My notes app!</h1>
              
              {/* Retrieved Notes from dispatch method of React-redux */}
              {retrieved_notes.length === 0 && <h3>No notes added yet!</h3>}
              {
                AddNoteToggle && <AddNote onSave={toggleAddNote} />
              }
              <Notelist Notes={retrieved_notes} />
              <Footer />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
