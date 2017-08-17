import * as React from "react"
import * as ReactDOM from "react-dom"
import { Dashboard } from "./dashboard"
import { create as renderer } from "react-test-renderer"
import { genericRouteProps } from "../../util/page_utils"

const actions = {
    logout: () => ({}),
    bootstrap: () => ({}),
    session: {
       loggedIn: false,
       accessToken: "",
    },
}

const render = () => (
    <Dashboard
        {...genericRouteProps}
        logout={actions.logout}
        bootstrap={actions.bootstrap}
        session={actions.session}
    />
)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(render(), div)
})

it("renders a snapshot", () => {
    const tree = renderer(render()).toJSON()
    expect(tree).toMatchSnapshot()
})