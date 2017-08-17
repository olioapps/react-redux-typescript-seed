import * as React from "react"
import { RouteComponentProps } from "react-router"
import * as redux from "redux"
import { connect } from "react-redux"
import { Store } from "../redux/reducers"
import { Session } from "../redux/core"
import ProgressSpinner from "./progress_spinner/progress_spinner"

interface ReduxState {
    readonly session: Session,
}

interface ReduxActions {
}

interface PageShellProps extends RouteComponentProps<{}> {
}

const mapStateToProps = (state: Store.All, ownProps: PageShellProps): ReduxState => ({
    session: state.session,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ReduxActions => ({
})

type ShellProps = ReduxState & ReduxActions & PageShellProps & RouteComponentProps<{}>

type Component = React.ComponentClass<RouteComponentProps<{}>>

function pageShell(Component: Component): Component {
    class PageShell extends React.Component<ShellProps, {}> {
        componentWillReceiveProps(nextProps: ShellProps): void {
            if (!nextProps.session.loggedIn && this.props.session.loggedIn) {
                nextProps.history.push("/")
            } else if (nextProps.session.loggedIn && !this.props.session.loggedIn) {
                this.props.history.push("/dashboard")
            }
        }

        render(): JSX.Element {
            const { session, ...props } = this.props
            return (
                <div>
                    <Component {...props} />
                    <ProgressSpinner />
                </div>
            )
        }
    }

    const ConnectedShell: React.ComponentClass<PageShellProps>
    = connect(mapStateToProps, mapDispatchToProps)(PageShell)
    return ConnectedShell
}

export default pageShell