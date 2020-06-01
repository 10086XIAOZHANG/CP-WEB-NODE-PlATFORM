import { Context } from '@core/koa'
import $http from '../utils/http'


export default class ServerAPIController {

  static async KDJZ (ctx: Context) {
    const HOST = 'http://pre-deposit.koudailc.com'
    const token = ctx.header['token']
    const UA = ctx.header['user-agent']
    let path = ctx.path
    const input  = ctx.fields

    if(/^\/platform/.test(path)) {
      const result = await $http.post(HOST + path, input, {
        headers: {
          'token': token,
          'User-Agent': UA
        }
      })
      // console.log(result)
      ctx.body = result
    } else {
      ctx.body = { data: {}, msg: 'empty' }
    } 
  }

  static async compose (ctx: Context) {
    const HOST = 'https://www.google.com'
    console.log('--react--')
    const token = ctx.header['token']
    const UA = ctx.header['user-agent']
    let path = ctx.path
    const input  = ctx.fields
    if(/^\/platform/.test(path)) {
      const result = await $http.post(HOST + path, input, {
        headers: {
          'token': token,
          'User-Agent': UA
        }
      })
      ctx.body = result.data
    } else {
      ctx.body = { data: {}, msg: 'empty' }
    }
    
  }

}