import * as React from "react"
import { RouteComponentProps } from "react-router"
import * as redux from "redux"
import { connect } from "react-redux"
import { AppState, Session } from "../../redux/core"
import { setPageTitle } from "../../util/page_utils"
import { Navbar } from "../../components/navbar/navbar"
import { Button } from "../../components/button/button"
import * as actions from "../../redux/actions"
import BarChart from "../../components/bar_chart/bar_chart"

const styles = require("./dashboard.module.css")

interface ReduxState {
    readonly session: Session,
}

interface ReduxActions {
    readonly logout: () => void
    readonly bootstrap: () => void
}

interface DashboardProps extends RouteComponentProps<{}> {
}

const mapStateToProps = (state: AppState, ownProps: DashboardProps): ReduxState => ({
    session: state.session,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<AppState>): ReduxActions => ({
    logout: () => dispatch( actions.logout() ),
    bootstrap: () => dispatch( actions.bootstrap() ),
})

interface DashboardState {
}

export class Dashboard extends React.Component<ReduxState & ReduxActions & DashboardProps, DashboardState> {
    constructor(props: ReduxState & ReduxActions & DashboardProps) {
        super(props)

        this.state = {
        }
    }

    componentWillMount(): void {
        setPageTitle("Dashboard")
        this.props.bootstrap()
    }

    goToLogin = () => this.props.history.push("/")

    logout = () => {
        this.props.logout()
        this.goToLogin()
    }

    render(): JSX.Element {
        const barChartMeta = {
            data: [
                {label: "Yesterday", value: 1},
                {label: "Today", value: 2},
                {label: "Tomorrow", value: 3},
            ],
            width: 720,
            height: 190,
            margin: {
                top: 5,
                right: 20,
                bottom: 30,
                left: 40
            }
        }
        return (
            <div className={styles.dashboard}>
                <Navbar
                    logout={this.logout}
                    userName="Some User (click here to logout)"
                />
                <br />
                <br />

                <Button >
                    Hi there
                </Button>
                <BarChart {...barChartMeta} />
            </div>
        )
    }
}

const ConnectedApp: React.ComponentClass<DashboardProps> = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default ConnectedApp