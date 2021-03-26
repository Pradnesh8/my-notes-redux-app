import * as actions from '../actions/actionTypes';

let initialState = [];
const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_NOTE:
            return [
                action.payload,
                ...state
            ]
        // Returns array of notes
        case actions.GET_NOTES:
            return action.payload
        // Return notes except deleted note
        case actions.DELETE_NOTE:
            return state.filter(note => note.id !== action.payload)
        // Return array of notes with updated value of note
        case actions.EDIT_NOTE:
            let arr = state.filter(note => note.id !== action.payload.id)
            return [action.payload].concat(arr)

        // Return Default state of notes
        default:
            return state;
    }
}

export default notesReducer
