// Bootstrap saga gets app assets
// uncomment and call correct client methods and actions

// import { call, put } from "redux-saga/effects"
// import { Client } from "../../api/client"
// import { handleErrors } from "./error_sagas"
import * as actions from "../actions"

export function* bootstrap(action: actions.BootstrapAction): {} {
    // const client = new Client
    // const resp = yield call(client.getSomethingThatNeedsBootstraping)

    // check if resp status is 200 and handle error if it is not
    // const respHasError: boolean = yield call(handleErrors, resp.status)
    // if (respHasError) { return }

    // yield put( actions.ingressSomethingThatNeedsBootstraping(resp.items) )
}
