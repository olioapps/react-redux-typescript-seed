import * as React from "react"
import {
    Route,
    Redirect,
} from "react-router-dom"
import { isLoggedIn } from "../util/access_token_utils"
import { RouteComponentProps } from "react-router"

interface PrivateRouteProps {
    readonly component: React.ComponentClass<RouteComponentProps<{}>>,
    readonly path: string
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps): JSX.Element {
    function renderRoutes(props: RouteComponentProps<{}>): JSX.Element {
        const loggedIn = isLoggedIn()
        const redirectToSignIn = !loggedIn
        return (
            redirectToSignIn ? (
                <Redirect to={{
                    pathname: "/",
                    state: { from: props.location },
                }}/>
            ) : (
                <Component {...props} />
            )
        )
    }

    return (
        <Route exact={true} {...rest} render={renderRoutes}/>
    )
}

export default PrivateRoute