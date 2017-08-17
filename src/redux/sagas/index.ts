import { takeEvery } from "redux-saga/effects"
import { login } from "./session_sagas"
import { bootstrap } from "./bootstrap_sagas"

export default function *root(): {} {
    yield [
        takeEvery("LOGIN", login),
        takeEvery("BOOTSTRAP", bootstrap),
    ]
}