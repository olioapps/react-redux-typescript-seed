import * as React from "react"
import * as redux from "redux"
import { Overlay, Spinner } from "@blueprintjs/core"
import { Store } from "../../redux/reducers"
import { connect } from "react-redux"
import * as actions from "../../redux/actions"
const styles = require("./progress_spinner.module.css")

interface ProgressSpinnerPops {
}

interface ProgressSpinnerState {
    readonly modalVisible: boolean,
}

interface ReduxState {
    readonly spinner: boolean
}

interface ReduxActions {
    readonly setSpinner: (visible: boolean) => void
}

type SpinnerProps = ProgressSpinnerPops & ReduxActions & ReduxState

const mapStateToProps = (state: Store.All, ownProps: ProgressSpinnerPops): ReduxState => ({
    spinner: state.spinner,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ReduxActions => ({
    setSpinner: (visible: boolean) => dispatch( actions.setSpinner(visible) ),
})


/* tslint:disable */
    let timer: any = null
    let maxRunTimer: any  = null
/* tslint:enable */

class ProgressSpinner extends React.Component<SpinnerProps, ProgressSpinnerState> {
    constructor(props: SpinnerProps) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount(): void {
        ProgressSpinner.clearTimer()
        if (this.props.spinner) {
            this.createTimer()
            this.createMaxRunTimer()
        } else {
            this.turnOffModal()
        }
    }

    componentWillReceiveProps(nextProps: SpinnerProps): void {
        if (nextProps.spinner) {
            ProgressSpinner.clearTimer()
            this.createTimer()
            this.createMaxRunTimer()
        } else {
            ProgressSpinner.clearTimer()
            this.turnOffModal()
        }
    }

    static clearTimer = () => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        if (maxRunTimer) {
            clearTimeout(maxRunTimer)
            maxRunTimer = null
        }
    }

    createTimer = () => {
        timer = setTimeout(() => this.setState({modalVisible: true}), 1000)
    }

    createMaxRunTimer = () => {
        maxRunTimer = setTimeout(() =>  this.props.setSpinner(false), 30000)
    }

    turnOffModal = () => {
        if (this.state.modalVisible) {
            this.setState({modalVisible: false})
        }
    }

    render(): JSX.Element {
        return (
            <Overlay isOpen={this.state.modalVisible} hasBackdrop={false}>
                    <Spinner className={`${styles.spinnerContainer} pt-large`} />
            </Overlay>
        )
    }
}

// export default ProgressSpinner
const ConnectedProgressSpinner: React.ComponentClass<ProgressSpinnerPops>
    = connect(mapStateToProps, mapDispatchToProps)(ProgressSpinner)
export default ConnectedProgressSpinner