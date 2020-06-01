import {getManager, getRepository, Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { Article } from '../entities/mysql/article'
import { Guid } from "../utils/tools";
import * as Moment from 'moment'


export default class ArticleController {

  static async getAll(args: any) {
    console.log(args)
    return await getManager().find(Article);
  }


  static async getById(id: string = '') {
    const article = await getRepository(Article).findOne({id})
    // console.log('article: ', article)
    return article
  }

  static async pages(args: any) {
    console.log(args, 'query args ===================')
    const options: FindManyOptions<Article> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      }
    }
    if(args.title) {
      options.where['title'] = Like(`%${args.title}%`)
    }
    if(args.abstract) {
      options.where['abstract'] = Like(`%${args.abstract}%`)
    }
    if(args.tag) {
      options.where['tag'] = Like(`%${args.tag}%`)
    }
    if(args.createdAt) {
      const date = args.createdAt.map((c: string) => (Moment(c)).valueOf())
      options.where['createdAt'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    console.log(options, '----options')

    const pages = await getRepository(Article).findAndCount(options)
      // .createQueryBuilder()
      // .where({
      //   // title: Like(args.title)
      // })
      // .orderBy({createdAt: 'DESC'})
      // .skip(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      // .take(args.pageSize)
      // .cache(10000)
      // .getManyAndCount()
    // console.log(pages[0].length, pages[1])
    return pages
  }

  static async insert(args: any, ctx: Context) {
    let model = new Article()
    model.id = Guid()
    model.title = args.title
    model.abstract = args.abstract
    model.description =  args.description
    model.typeId = args.typeId
    model.isTop = args.isTop
    model.tag = args.tag
    model.createdBy = ctx.state['CUR_USER'].id
    model.createdAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    const result = await getRepository(Article).save(model)
    return result
  }

  static async update(args: any, ctx: Context) {
    const article = new Article
    article.id = args.id
    article.title = args.title
    article.abstract = args.abstract
    article.description =  args.description
    article.typeId = args.typeId
    article.isTop = args.isTop
    article.tag = args.tag
    article.updatedAt = Date.now()
    article.updatedBy = ctx.state['CUR_USER'].id
    const result = await getRepository(Article).save(article)
    return result
  }

}