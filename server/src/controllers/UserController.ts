import {getManager, getRepository, Like, Between, Equal, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { User } from '../entities/mysql/user'
import { Guid, cryptoPwd } from "../utils/tools"
import * as Moment from 'moment'


export default class UserController {

  static async getAll(args: any) {
    return await getManager().find(User);
  }


  static async getById(id: string = '') {
    const article = await getRepository(User).findOne({id}, {
      select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'sex', 'remark']
    })
    return article
  }

  static async pages(args: any) {
    console.log(args, 'query args ===================')
    const options: FindManyOptions<User> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      },
      select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'sex', 'remark']
    }
    if(args.username) {
      options.where['username'] = Like(`%${args.username}%`)
    }
    if(args.nickName) {
      options.where['nickName'] = Like(`%${args.nickName}%`)
    }
    if(args.userType >= 0) {
      options.where['userType'] = Equal(args.userType)
    }
    if(args.createdAt) {
      const date = args.createdAt.map((c: string) => (Moment(c)).valueOf())
      options.where['createdAt'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    const pages = await getRepository(User).findAndCount(options)
    return pages
  }

  static async insert(args: any, ctx: Context) {
    let username = args.username;
    let password = args.password;
    if(!(username && username.length > 2)) {
      ctx.throw(400, '用户名长度必须大于1个字符')
    }
    if(!(password && password.length > 5)) {
      ctx.throw(400, '用户密码长度必须大于6个字符')
    }
    let model = new User()
    model.id = Guid()
    model.username = args.username
    model.nickName = args.nickName
    model.userType = args.userType
    model.password = cryptoPwd(password, username)
    model.remark =  args.remark
    model.sex =  args.sex
    model.createdBy = ctx.state['CUR_USER']
    model.createdAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER']
    model.updatedAt = Date.now()
    const result = await getRepository(User).save(model)
    return result
  }

  static async update(args: any, ctx: Context) {
    let username = args.username;
    let password = args.password;
    if(!(username && username.length > 2)) {
      ctx.throw(400, '用户名长度必须大于1个字符')
    }
    if(password && password.length > 0 && password.length < 6) {
      ctx.throw(400, '用户密码长度必须大于6个字符')
    }

    const user = new User
    user.id = args.id
    user.username = args.username
    user.nickName = args.nickName
    user.userType = args.userType
    user.sex = args.sex
    user.remark =  args.remark
    if(password) { // if pwd changed
      user.password = cryptoPwd(password, username)
    }
    user.updatedBy = ctx.state['CUR_USER'].id
    user.updatedAt = Date.now()
    const result = await getRepository(User).save(user)
    return result
  }

}