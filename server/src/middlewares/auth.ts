import { Context } from '@core/koa'
import Store from "../utils/session/store";
import { JWT_KEY, NO_AUTH_URLS } from '../constants'

const store = new Store

export default async(ctx: Context, next: () => Promise<any>) => {
  const method = ctx.method
  const path = ctx.path
  if(NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))) {
    await next()
  } else {
    const token: string = ctx.header['authorization'].split(' ')[1] || '' // after jwt, token must exist
    const authorized = await store.get(token)
    if(authorized) { // redis exist jwt token
      const fields: any = ctx.fields
      const USER_TYPE = ctx.state[JWT_KEY].userType
      if(
        method === 'GET' || // all get, pass
        USER_TYPE !== 9 || // not demo user, pass
        (USER_TYPE === 9 && NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))) || // demo user, but not auth urls, pass
        (path === '/graphql' && !/^\smutation\s/.test(fields.query)) || // grahpql not mutation, pass
        (USER_TYPE === 9 && path === '/api/logout') // demo use logout, pass
      ) {
        await next()
      } else {
        ctx.throw(403, '测试用户禁止访问！')
      }
    } else {
      ctx.throw(401)
    }
  }
}