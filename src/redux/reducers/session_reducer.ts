import { Action } from "../actions"
import {
    INITIAL_STATE,
    setSession,
    Session,
    removeSession,
} from "../core"

function session(state: Session = INITIAL_STATE.session, action: Action ): Session {
    switch (action.type) {
        case "RECEIVE_ACCESS_TOKEN":
            return setSession(state, action.accessToken)
        case "LOGOUT":
            return removeSession(state)
    default:
        return state
    }
}

export default session