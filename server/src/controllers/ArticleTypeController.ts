import {getManager, getRepository, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { ArticleType } from '../entities/mysql/articleType'
import { Guid } from "../utils/tools";
import * as Moment from 'moment'


export default class ArticleController {

  static async getAll(args: any) {
    return await getManager().find(ArticleType);
  }


  static async getById(id: string = '') {
    // getManager().findOne()
    const articleType = await getRepository(ArticleType).findOne({id})
    return articleType
  }

  static async pages(args: any) {
    const options: FindManyOptions<ArticleType> = {
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
    console.log(options, '----options')
    const pages = await getRepository('articleType').findAndCount(options)
      // .createQueryBuilder()
      // .orderBy({createdAt: 'DESC'})
      // .offset(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      // .limit(args.pageSize)
      // .getManyAndCount()
    // console.log(pages[0].length, pages[1])
    return pages
  }

  static async insert(args: any, ctx: Context) {
    let model = new ArticleType()
    model.id = Guid()
    model.name = args.name
    model.remark = args.remark
    model.createdAt = Date.now()
    model.createdBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    const result = await getRepository(ArticleType).save(model)
    return result
  }
  
  static async update(args: any, ctx: Context) {
    let model = new ArticleType()
    // model.id = args.id
    model.name = args.name
    model.remark = args.remark
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    const result = await getRepository(ArticleType).update(args.id, model)
    console.log('result:', result)
    return result
  }

}