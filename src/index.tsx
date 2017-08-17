import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
require("./index.module.css")
require("../node_modules/@blueprintjs/core/dist/blueprint.css")

import { ConnectedRouter } from "react-router-redux"
import { store, history } from "./redux/store"
import PrivateRoute from "./components/private_route"
import PublicRoute from "./components/public_route"
import pageShell from "./components/page_shell"

// pages
import LoginPage from "./pages/login/login_page"
import Dashboard from "./pages/dashboard/dashboard"

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <PublicRoute path="/" component={pageShell(LoginPage)}/>
                <PrivateRoute path="/dashboard" component={pageShell(Dashboard)}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
)