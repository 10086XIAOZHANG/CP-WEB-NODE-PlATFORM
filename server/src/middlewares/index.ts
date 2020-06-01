import * as Koa from "koa";
import Auth from "./auth";
import KoaBody from "../core/postData";
import Cors from "./cors";
import Request from "./request";
import Response from "./response";
import Routes from "../routes";
import JWT from "./xJwt";
const _NOJWT_ = process.env.NODE_ENV === "nojwt";

const Middlewares = (App: Koa) => {
  App.use(KoaBody);
  if (!_NOJWT_) {
    App.use(JWT);
    App.use(Auth);
    App.use(Cors);
  }
  App.use(Request);
  App.use(Response);

  App.use(Routes.routes()); //inject routes
};

export default Middlewares;
