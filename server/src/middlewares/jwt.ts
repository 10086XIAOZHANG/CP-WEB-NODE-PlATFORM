import * as JWT from 'koa-jwt'
import { Context } from '@core/koa'
import { JWT_SECRET, JWT_KEY } from '../constants'

export default JWT({
  secret: JWT_SECRET,
  key: JWT_KEY
}).unless({path: [/\/api\/login/]})
