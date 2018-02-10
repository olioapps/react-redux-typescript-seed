import * as React from "react"

import { RouteComponentProps } from "react-router"

import * as redux from "redux"
import { connect } from "react-redux"
import { AppState, Session } from "../redux/core"
import Albums from "../components/albums"

interface ReduxState {
    readonly session: Session,
}

interface ReduxActions {
}

interface VinylProps extends RouteComponentProps<{}> {
}

const mapStateToProps = (state: AppState, ownProps: VinylProps): ReduxState => ({
    session: state.session,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<AppState>): ReduxActions => ({
})

interface VinylState {
}

export class Vinyl extends React.Component<ReduxState & ReduxActions & VinylProps, VinylState> {
    constructor(props: ReduxState & ReduxActions & VinylProps) {
        super(props)

        this.state = {
        }
    }



    render(): JSX.Element {
        return <Albums session={this.props.session} />
    }
}

const ConnectedVinyl: React.ComponentClass<VinylProps> = connect(mapStateToProps, mapDispatchToProps)(Vinyl)
export default ConnectedVinyl