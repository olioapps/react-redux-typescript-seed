import * as React from "react"
import * as redux from "redux"
import { RouteComponentProps } from "react-router"
import { connect } from "react-redux"
import { Store } from "../../redux/reducers"
import { setPageTitle } from "../../util/page_utils"
import { Button } from "../../components/button/button"
import { Error } from "../../redux/core"
import * as actions from "../../redux/actions"

const styles = require("./login_page.module.css")

interface ReduxState {
    readonly error: Error
}

interface ReduxActions {
    readonly login: (username: string, password: string) => void
    readonly receiveError: (errorText: string) => void
    readonly clearError: () => void
}

interface LoginPageProps extends RouteComponentProps<{}> {
}

interface LoginState {
    readonly username: string,
    readonly password: string,
    readonly errorText: string,
}

interface InputEvent {
    readonly target: {
        readonly name: string,
        readonly value: string,
    }
}

type LoginProps = ReduxState & ReduxActions & LoginPageProps & RouteComponentProps<{}>

const mapStateToProps = (state: Store.All, ownProps: LoginPageProps): ReduxState => ({
    error: state.error,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ReduxActions => ({
    login: (username, password) => dispatch( actions.login(username, password) ),
    receiveError: (errorText: string) => dispatch( actions.receiveError(errorText) ),
    clearError: () => dispatch( actions.clearError()),
})

export class LoginPage extends React.Component<LoginProps, LoginState> {
    constructor(props: ReduxState & ReduxActions & LoginPageProps) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errorText: "",
        }
    }

    componentWillMount(): void {
        setPageTitle("Log in")
    }

    componentWillReceiveProps(nextProps: ReduxState & ReduxActions & LoginPageProps): void {
        if (nextProps.error.text !== this.props.error.text) {
            this.setState({errorText: nextProps.error.text})
        }
    }

    login = () => {
        const { username, password } = this.state
        if (!this.isValidInput(username) || !this.isValidInput(password)) { return }

        // clear out old error before submitting
        this.props.clearError()
        this.props.login(username, password)
    }

    handleChange = (event: InputEvent) => {
        const key = event.target.name.toLowerCase()

        if (key) {
            const meta = {}
            meta[key] = event.target.value
            this.setState({...meta, errorText: ""})

        }
    }

    isValidInput = (input: string) => {
        if (input.length === 0) {
            this.setState({errorText: "Fields cannot be blank"})
            return false
        }

        return true
    }

    render(): JSX.Element {
        return (
            <div className={styles.page}>
                <div className={styles.bg}/>
                <div className={styles.box}>
                    <h3 className={styles.h3}>
                        Log in
                    </h3>

                    <div className={styles.error}>{this.state.errorText}</div>
                    <div className={styles.form}>
                        <label className={`pt-label ${styles.label}`}>
                            Email
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={`pt-input ${styles.input}`}
                                value={this.state.username}
                                onChange={this.handleChange}
                                name={"username"}
                                autoFocus={true}
                            />
                        </label>

                        <label className={`pt-label ${styles.label}`}>
                            Password
                            <input
                                type="password"
                                className={`pt-input ${styles.input}`}
                                placeholder="••••••••••••••••"
                                value={this.state.password}
                                onChange={this.handleChange}
                                name={"password"}
                            />
                        </label>

                        <Button
                            text="Log in"
                            className={`pt-intent-primary pt-large ${styles.button}`}
                            kind="primary"
                            onClick={this.login}
                        />
                    </div>

                </div>
                <a href="#">Forgot password?</a>
            </div>
        )
    }
}

// export default LoginPage
const ConnectedApp: React.ComponentClass<LoginPageProps>
    = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
export default ConnectedApp