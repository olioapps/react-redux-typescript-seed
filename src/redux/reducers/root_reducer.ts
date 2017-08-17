import { combineReducers } from "redux"
import error from "./error_reducer"
import session from "./session_reducer"
import spinner from "./spinner_reducer"

const rootReducer = combineReducers({
    session,
    error,
    spinner,
})

export default rootReducer