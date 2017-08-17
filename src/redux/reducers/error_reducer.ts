import { Action } from "../actions"
import { INITIAL_STATE, setError, Error } from "../core"

function error(state: Error = INITIAL_STATE.error, action: Action ): Error {
    switch (action.type) {
        case "RECEIVE_ERROR":
            return setError(state, action.errorText)
        case "CLEAR_ERROR":
            return {text: ""}
    default:
        return state
    }
}

export default error