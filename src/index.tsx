import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./app"
import { store } from "./redux/store"
require("./index.module.css")
require("../node_modules/@blueprintjs/core/dist/blueprint.css")

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root"),
)