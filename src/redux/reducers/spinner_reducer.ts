import { Action } from "../actions"
import {
    INITIAL_STATE,
} from "../core"

function spinner(state: boolean = INITIAL_STATE.spinner, action: Action ): boolean {
    switch (action.type) {
        case "SET_SPINNER":
            return action.visible
    default:
        return state
    }
}

export default spinner