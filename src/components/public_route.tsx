import * as React from "react"
import {
    Route,
    Redirect,
} from "react-router-dom"
import { isLoggedIn } from "../util/access_token_utils"
import { RouteComponentProps } from "react-router"

interface PublicRouteProps {
    readonly component: React.ComponentClass<RouteComponentProps<{}>>,
    readonly path: string
}

export function PublicRoute({ component: Component, ...rest }: PublicRouteProps): JSX.Element {
    const loggedIn = isLoggedIn()
    const redirectToDashboard = loggedIn
    function renderRoutes(props: RouteComponentProps<{}>): JSX.Element {
        return (
            redirectToDashboard ? (
                <Redirect to={{
                    pathname: "/dashboard",
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

export default PublicRoute