import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
const cache = new InMemoryCache();
const initData = window.__INITIAL_GRAPHQL_STATE__;
if (initData) {
  cache.restore(initData);
}
const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ networkError, graphQLErrors }) => {
      if (graphQLErrors) {
        console.error(...graphQLErrors);
      }
      if (networkError) {
        console.error(networkError);
      }
    }),
    // new WebSocketLink({
    //   uri: `${websocketProtocol}://${APP_URL}/subscriptions`,
    //   options: {
    //     reconnect: true,
    //   },
    // }),
    new HttpLink({ credentials: "same-origin", uri: "/graphql" }),
  ]),
  cache,
});
const Root = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
ReactDOM.render(<Root />, document.getElementById("root"));
