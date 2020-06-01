import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../../src/pages/home/App";
import { layout, layoutActicle } from "./layout";
import getCreateStore from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { matchRoutes, renderRoutes } from "react-router-config";
import router from "../../src/pages/home/router/route";
import acticleRouter from "../../src/pages/acticle/router/route";
import { matchPath } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { renderToStringWithData } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http";
import { SchemaLink } from "apollo-link-schema";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray
 * @param {*} url
 */
const getMatch = (routesArray, url) => {
  return routesArray.some((router) =>
    matchPath(url, {
      path: router.path,
      exact: router.exact,
    })
  );
};
/**
 * 渲染服务端路由
 */
module.exports.render = async (ctx, next) => {
  let isMatch = getMatch(router, ctx.req.url);
  let isMatchActicle = getMatch(acticleRouter, ctx.req.url);
  console.log("acticleRouter", ctx.req.url);
  if (!isMatch && !isMatchActicle) {
    await next();
  } else if (isMatch) {
    const { store, history } = getCreateStore(ctx);
    const branch = matchRoutes(router, ctx.req.url);
    const promises = branch.map(({ route }) => {
      const fetch = route.component.fetch;
      console.log(fetch, route.component);
      return fetch instanceof Function ? fetch(store) : Promise.resolve(null);
    });
    await Promise.all(promises).catch((err) => {
      console.log(err);
    });
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    );
    let initState = store.getState();
    const body = layout(html, initState);
    ctx.body = body;
  } else if ((isMatchActicle, ctx.req.url)) {
    const branch = matchRoutes(acticleRouter, ctx.req.url);

    const client = new ApolloClient({
      ssrMode: true,
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        onError(({ networkError, graphQLErrors }) => {
          if (graphQLErrors) {
            console.error(...graphQLErrors);
          }
          if (networkError) {
            console.error(networkError);
          }
        }),
        new createHttpLink({
          credentials: "same-origin",
          fetch: fetch,
          uri: "http://127.0.0.1:8020/graphql",
        }),
      ]),
    });
    const promises = branch.map(({ route }) => {
      const fetch = route.component.fetch;
      console.log(fetch, route.component);
      return fetch instanceof Function ? fetch(client) : Promise.resolve(null);
    });
    await Promise.all(promises).catch((err) => {
      console.log(err);
    });
    const html = renderToStringWithData(
      <ApolloProvider client={client}>
        <StaticRouter location={ctx.req.url} context={{}}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );
    const body = layoutActicle(html, client.extract());
    ctx.body = body;
  }
};
