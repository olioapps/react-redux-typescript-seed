import { put } from "redux-saga/effects"
import { parseError } from "../../util/error_utils"
import * as actions from "../actions"

export function* handleErrors(status: number): {} {
    if (status !== 200) {
        yield put( actions.setSpinner(false) )
        yield put( actions.receiveError(parseError(status)) )
        if (status === 401) {
            yield put( actions.logout() )
        }

        return true
    }

    return false
}