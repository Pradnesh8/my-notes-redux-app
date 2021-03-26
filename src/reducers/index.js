import { combineReducers } from 'redux'

import notesReducer from './notes'
import authReducer from './auth'

const rootReducer = combineReducers({
    // Define a top-level state field named `notes`, handled by `notesReducer`
    notes: notesReducer,
    // Define a top-level state field named `user`, handled by `authReducer`
    user: authReducer
})

export default rootReducer