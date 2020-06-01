import {getManager, getRepository, Like, FindManyOptions, Between} from "typeorm";
import { Context } from '@core/koa'
import { Tag } from '../entities/mysql/tag'
import { Guid } from "../utils/tools";
import * as Moment from 'moment'
import { JWT_KEY } from '../constants'

export default class TagController {

  static async getAll(args: any) {
    console.log(args)
    return await getManager().find(Tag);
  }


  static async getById(id: string = '') {
    const tag = await getRepository(Tag).findOne({id})
    return tag
  }

  static async pages(args: any) {
    const options: FindManyOptions<Tag> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      }
    }
    if(args.name) {
      options.where['name'] = Like(`%${args.name}%`)
    }
    if(args.createdAt) {
      const date = args.createdAt.map((c: string) => (Moment(c)).valueOf())
      options.where['createdAt'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    const pages = await getRepository(Tag).findAndCount(options)
    return pages
  }

  static async insert(args: any, ctx: Context) {
    if(!args.name || args.name.length < 1) {
      ctx.throw(400, '标签名称长度必须大于1')
    }
    let model = new Tag()
    model.id = Guid()
    model.name = args.name
    model.remark = args.remark
    model.createdAt = Date.now()
    model.createdBy = ctx.state[JWT_KEY].id
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state[JWT_KEY].id
    const result = await getRepository(Tag).save(model)
    return result
  }

  static async update(args: any, ctx: Context) {
    if(!args.name || args.name.length < 1) {
      ctx.throw(400, '标签名称长度必须大于1')
    }
    let model = new Tag()
    model.id = args.id
    model.name = args.name
    model.remark = args.remark
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state[JWT_KEY].id
    const result = await getRepository(Tag).save(model)
    return result
  }

}