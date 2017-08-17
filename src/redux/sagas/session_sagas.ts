// Uncomment client code and ingress returned token

import { put } from "redux-saga/effects"
// import { Client } from "../../api/client"
import { setAccessToken } from "../../util/access_token_utils"
import * as actions from "../actions"
// import { handleErrors } from "./error_sagas"

export function* login(action: actions.LoginAction): {} {
    yield put( actions.setSpinner(true) )
    // const client = new Client
    // const resp = yield call(client.login, action.username, action.password)

    // check if resp status is 200 and handle error if it is not
    // const respHasError: boolean = yield call(handleErrors, resp.status)
    // if (respHasError) { return }

    setAccessToken("resp.items.data.access_token")
    yield put( actions.receiveAccessToken("resp.items.data.access_token") )
    yield put( actions.bootstrap() )
    yield put( actions.setSpinner(false) )
}
