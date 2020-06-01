// import * as Koa from '@core/koa'
// import * as Cookies from "cookies";
import Store from "./store";

class SessionOptions {
  key: string = 'SESSION_ID'
  store: Store = new Store()
  signed: boolean
  maxAge: number
}


const Session = (opts: SessionOptions = new SessionOptions) => {
  const { key, store } = opts;

  return async (ctx: any, next: () => Promise<any>) => {
    let id = ctx.cookies.get(key, opts);
    if (id) {
      ctx.session = await opts.store.get(id);
      if (typeof ctx.session !== "object" || ctx.session == null) {
        ctx.session = {};
        id = undefined; // clear old id
      }
    } else {
      ctx.session = {};
    }

    const old = JSON.stringify(ctx.session);

    await next(); // any calc

    // if is an empty object
    if (ctx.session instanceof Object && !Object.keys(ctx.session).length) {
      ctx.session = {};
      // need clear old session
      if (id) {
        await store.destroy(id);
        return;
      }
    }

    // need clear old session
    // if (id && !ctx.session) {
    //   await store.destroy(id);
    //   return;
    // }

    // set/update session
    const sid = await store.set(ctx.session, Object.assign({}, opts, { sid: id }));
    // need to optimize
    ctx.cookies.set(key, sid, opts);

  };
};

export default Session;
