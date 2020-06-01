import * as Crypto from 'crypto';
import {getManager, getRepository, Like, Equal} from "typeorm";
import { Context } from '@core/koa'
import { User } from '../entities/mysql/user'
import Store from "../utils/session/store";
import { JWT_SECRET, EXP_TIME } from '../constants'
import { sign } from '../core/jwt/sign'
import { cryptoPwd } from "../utils/tools"
import UserCtrl from './UserController'

const store = new Store

export default class AccountController {

  //POST
  static async login(ctx: Context) {
    const inputs: any = ctx.fields;
    let username = inputs.username;
    let password = inputs.password;
    if ((username && username.length > 0) && (password && password.length > 5)) {
      const result = await getManager().findOne(User, {
        select: ['id', 'username', 'nickName', 'sex', 'userType'],
        where: {
          username: username,
          password: cryptoPwd(password, username)
        }
      });
      if(result) {
        const token = sign({ ...result, exp: EXP_TIME }, JWT_SECRET)
        await store.set('true', {
          sid: token,
          maxAge: EXP_TIME // millisecond
        })
        ctx.Json({ data: token });
      } else {
        ctx.throw(400, '用户名或密码错误！');
      }
    } else {
      ctx.throw(400, '用户名或密码错误！');
    }
  }

  // POST
  static async register(ctx: Context) {
    const result = await UserCtrl.insert(ctx.fields, ctx)
    ctx.Json(result)
  }

  //POST
  static async logout(ctx: Context) {
    const tokens = ctx.header['authorization']
    const token = tokens.split(' ')[1]
    await store.destroy(token)
    ctx.Json({ data: 1, msg: '退出成功！' });
  }

}