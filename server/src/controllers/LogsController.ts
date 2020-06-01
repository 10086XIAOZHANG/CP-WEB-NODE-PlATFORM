import {getMongoManager, getMongoRepository, Like, Between, FindManyOptions, Equal} from "typeorm";
import * as Moment from 'moment'
import { Context } from '@core/koa'
import { API } from '../entities/mongo/api'
import { Errors } from '../entities/mongo/errors'
import { Guid } from "../utils/tools";



export default class LogsController {


  static async getById(id: string = '') {
    const api = await getMongoRepository(API, 'mongo').findOne({id})
    // console.log('api: ', api)
    return api
  }

  static async apiPages(ctx: Context) {
    // console.log('log-----', ctx.state)
    const params = ctx.getParams
    const query = ctx.query
    
    const options: FindManyOptions<API> = {
      skip: params.offset,
      take: params.limit,
      order: {
        createdAt: 'DESC'
      },
      where: {}
    }
    if(query.path) {
      // const dateRange = query.createdAt.split(',').map((d: string) => Moment(d).format('YYYY/MM/DD HH:mm:ss.SSS'))
      options.where['path'] = query.path
    }
    if(query.url) {
      options.where['url'] = query.url
    }
    const pages = await getMongoRepository('API', 'mongo').findAndCount(options)
    ctx.Pages({page: pages})
  }

  static async errorsPages(ctx: Context) {
    const params = ctx.getParams
    const query = ctx.query
    
    const options: FindManyOptions<Errors> = {
      skip: params.offset,
      take: params.limit,
      order: {
        createdAt: 'DESC'
      },
      where: {}
    }
    if(query.path) {
      options.where['path'] = query.path
    }
    if(query.url) {
      options.where['url'] = query.url
    }
    const pages = await getMongoRepository('Errors', 'mongo').findAndCount(options)
    ctx.Pages({page: pages})
  }

  // api log insert
  static async APIlogger (ctx: Context, options: any): Promise<void> {
    if(!/^\/api\/log-(api|errors)$/.test(ctx.path)) {
      const guid = Guid()
      const model = new API()
      const method = ctx.method
      model.id = guid
      model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
      model.path = ctx.path
      model.url = ctx.url
      model.status = ctx.status
      model.origin = ctx.origin
      model.hostname = ctx.header['x-host'];
      model.headers = ctx.header
      model.resHeaders = ctx.response.header
      model.resData = ctx.body
      model.protocol = ctx.protocol;
      model.createdAt = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS')
      model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip

      model.method = method
      if(method === 'GET') {
        model.params = ctx.querystring
      } else if(/^P(U|OS)T$/.test(method)){
        if(/^\/api\/login$/.test(ctx.path)){
          let params = ctx.fields;
          params['password'] = '******';
        }
        model.params = ctx.fields
      }

      model.time = options.time  // deal time
      const result = await getMongoManager('mongo').save(model)
    }

  }

  // errors log insert
  static async ERRlogger (ctx: Context, options: any): Promise<void> {
    const guid = Guid()
    const model = new Errors()
    const method = ctx.method
    model.id = guid
    model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
    model.path = ctx.path
    model.url = ctx.url
    model.origin = ctx.origin
    model.hostname = ctx.header['x-host'];
    model.headers = ctx.header
    model.resHeaders = ctx.response.header
    model.resData = ctx.body
    model.protocol = ctx.protocol;
    model.createdAt = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS')
    model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip

    model.status = options.status
    model.errors = options.errors
    model.msg = options.msg

    model.method = method
    if(method === 'GET') {
      model.params = ctx.querystring
    } else if(/^P(U|OS)T$/.test(method)){
      if(/^\/api\/login$/.test(ctx.path)){
        let params = ctx.fields;
        params['password'] = '******';
      }
      model.params = ctx.fields
    }

    model.time = options.time  // deal time
    const result = await getMongoRepository(Errors, 'mongo').save(model)
  }

}