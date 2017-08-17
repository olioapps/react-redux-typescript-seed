import { deleteAccessToken } from "../util/access_token_utils"

interface BaseRepository<T> {
    readonly items: Map<string, T>,
    readonly selected: string,
    readonly sort: ReadonlyArray<string>,
}

export interface Example {
    readonly id: string,
    readonly title: string,
}

export interface Example extends BaseRepository<Example> {
}

export interface Session {
    readonly loggedIn: boolean,
    readonly accessToken: string,
}

export interface Error {
    readonly text: string,
}

/////////////////////////////////////////

export interface AppState {
    readonly session: Session,
    readonly error: Error,
    readonly spinner: boolean,
}

const defaultAppState: AppState = {
    session: {
        accessToken: "",
        loggedIn: false,
    },
    error: {
        text: "",
    },
    spinner: false,
}

export const INITIAL_STATE: AppState = defaultAppState

// session

export const setSession = (state: Session, accessToken: string): Session => {
    return ({
        accessToken: accessToken,
        loggedIn: true,
    })
}

export const removeSession = (state: Session): Session => {
    deleteAccessToken()
    return ({
        accessToken: "",
        loggedIn: false,
    })
}

// error

export const setError = (state: Error, errorText: string): Error => ({
    text: errorText,
})
