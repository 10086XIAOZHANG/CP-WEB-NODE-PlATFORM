import { Context } from '@core/koa'
import { verify } from './verify'

export interface Options {
  secret: string | Buffer
  key?: string
  debug?: boolean
  encoding?: string
  passthrough?: boolean
  tokenKey?: string
  unless?: RegExp[][]
}

// verify jwt, koa middleware

export default (opts: Options) => {
  const { debug, key = 'jwt-user', unless, passthrough, tokenKey } = opts;

  return async (ctx: Context, next: () => Promise<any>) => {
    const method = ctx.method
    if(unless.some(urlReg => urlReg[0].test(ctx.path) && urlReg[1].test(method))) {
      await next()
    } else {
      let token = ctx.header['authorization']

      if(!token) {
        ctx.throw(401, debug ? 'Token not found' : 'Authentication Error')
      }

      let { state: { secret = opts.secret } } = ctx;

      try {
        if (!secret) {
          throw new Error('Secret not provided');
        }

        const result = verify(token, opts)
        if(!result[0]) {
          ctx.throw(401, debug ? result[1] : 'Authentication Error')
        }

        // pass
        ctx.state[key] = result[1];
        if(tokenKey) {
          ctx.state[key] = token
        }

      } catch(e) {
        const msg = debug ? e.message : 'Authentication Error';
        ctx.throw(401, msg, { originalError: e });
      }

      await next() // authorized, next()
    }

  }
}