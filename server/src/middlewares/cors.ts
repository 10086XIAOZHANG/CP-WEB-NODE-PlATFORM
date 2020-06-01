import { Context } from '@core/koa'
import Cors from '../core/cors'

const _PROD_ = process.env.NODE_ENV === 'production'

export default Cors({
  origin: function (ctx: Context) {
    const origin = ctx.header.origin
    if (_PROD_) {
      return false;
    } else {
      return origin;
    }
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization-User', 'X-Requested-With', 'Accept', 'token', 'x-url', 'x-store']
})
