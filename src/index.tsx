import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./app"
import { store } from "./redux/store"
require("./index.module.css")
require("../node_modules/@blueprintjs/core/dist/blueprint.css")
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:8090" }),
    cache: new InMemoryCache()
})

// import { ApolloLink } from 'apollo-link';

// const apolloLogger = new ApolloLink((operation, forward) => {
//   console.log(operation.operationName);
//   if (!forward) {return null}

//   return forward(operation).map((result) => {
//     console.log(`received result from ${operation.operationName}`);
//     return result;
//   })
// });

// tslint:disable
ReactDOM.render(
    <ApolloProvider client={client as ApolloClient<any>}>
    <Provider store={store}>
        <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById("root"),
)
// tslint:enable