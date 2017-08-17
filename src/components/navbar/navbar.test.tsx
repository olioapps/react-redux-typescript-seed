import * as React from "react"
import * as ReactDOM from "react-dom"
import { Navbar } from "./navbar"
import { create as renderer } from "react-test-renderer"

const logout = () => {
    // does nothing
}

const renderNavbar = () => (
     <Navbar
        userName="Test"
        logout={logout}
    />
)

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(renderNavbar(), div)
})

it("renders a snapshot", () => {
    const tree = renderer(renderNavbar()).toJSON()
    expect(tree).toMatchSnapshot()
})
