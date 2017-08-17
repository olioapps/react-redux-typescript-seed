import { Session, Error } from "../core"
export namespace Store {
    // tslint:disable-next-line
    export interface INITIAL_STATE {
    }

    export interface All {
        readonly router: {},
        readonly session: Session,
        readonly error: Error
        readonly spinner: boolean,
    }

    export interface State {
    }
}