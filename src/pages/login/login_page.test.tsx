import * as React from "react"
import * as ReactDOM from "react-dom"

import { LoginPage } from "./login_page"
import { create as renderer } from "react-test-renderer"
import { genericRouteProps } from "../../util/page_utils"

const actions = {
    login: (username: string, password: string) => ({}),
    error: {text: ""},
    receiveError: (errorText: string) => ({}),
    clearError: () => ({}),
}

const renderLogin = () => (
   <LoginPage
            login={actions.login}
            error={actions.error}
            receiveError={actions.receiveError}
            clearError={actions.clearError}
            {...genericRouteProps}
        />
)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(renderLogin(), div)
})

it("renders a snapshot", () => {
    const tree = renderer(renderLogin()).toJSON()
    expect(tree).toMatchSnapshot()
})