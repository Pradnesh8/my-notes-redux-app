import * as actions from "./actionTypes";
import axios from 'axios'

export const addNote = (payload) => {
  return { type: actions.ADD_NOTE, payload }
};

export const getNotes = (notes) => {
  return {
    type: actions.GET_NOTES, payload: notes
  }
};

export const deleteNote = (payload) => {
  return { type: actions.DELETE_NOTE, payload }
};

export const editNote = (payload) => {
  return { type: actions.EDIT_NOTE, payload }
};

// Middleware to call api using Async/await 

export const fetchNotesMiddleware = () => async (dispatch, getState) => {
  // Fetch data form Json-server using axios
  try {
    const email = JSON.parse(localStorage.getItem("user")).email;
    const res = await axios.get(`http://localhost:5000/Notes?email=${email}`);
    const data = res.data;
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    dispatch(getNotes(data));
    console.log("Retrieved Notes from server first time", getState());
  } catch (err) {
    console.log(err);
  }
}

export const addNoteMiddleware = (note) => async (dispatch, getState) => {
  // ADD note to Json-server using axios
  try {
    let date = new Date();
    const res = await axios.post('http://localhost:5000/Notes', { ...note, "date": date });

    // const data = await res.json();
    const data = res.data;
    console.log("Note to be added", data);
    dispatch(addNote(data));
    console.log("State of notes after addNote", getState());
  } catch (err) {
    console.log(err);
  }
}

export const deleteNoteMiddleware = (id) => async (dispatch, getState) => {
  // delete note from Json-server using axios
  try {
    const res = await axios.delete(`http://localhost:5000/Notes/${id}`);
    // const data = await res.json();
    const data = res.status;
    console.log("Note to be deleted", data);
    dispatch(deleteNote(id));
    console.log("State of notes after deleteNote", getState());
  } catch (err) {
    console.log(err);
  }
}

export const editNoteMiddleware = (edited_note) => async (dispatch, getState) => {
  // delete note from Json-server using axios
  try {
    // TO add date and time of Note when updated
    let date = new Date();
    const res = await axios.put(`http://localhost:5000/Notes/${edited_note.id}`, { ...edited_note, "date": date });
    const data = res.data;
    // data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log("Edit Note form Called", data);
    dispatch(editNote(data));
    console.log("State of notes after editNote", getState());
  } catch (err) {
    console.log(err);
  }
}
