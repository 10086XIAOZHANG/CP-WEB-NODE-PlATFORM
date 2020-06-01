import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import router from "./router/route";

const configRoute = (router) => {
  return (
    <div>
      {router.map((route, index) => (
        <Route
          key={index + "route-render"}
          path={route.path}
          exact={route.exact ? route.exact : false}
          component={route.component}
        />
      ))}
    </div>
  );
};
const BasicExample = () => (
  <div className="app-container">
    <div>
      <ul>
        <li>
          <Link to="/acticle">Acticle</Link>
        </li>
      </ul>
      <hr />
      {configRoute(router)}
    </div>
  </div>
);
export default BasicExample;
