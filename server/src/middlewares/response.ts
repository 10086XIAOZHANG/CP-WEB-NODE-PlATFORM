import * as Koa from '@core/koa'
import { ResponseData } from '../models/ResponseData'

const json = (ctx: Koa.Context) => (res: any) => {
  let resData = new ResponseData();
  const type = typeof res;
  if(type === 'undefined') {
    resData = {data: undefined, msg: 'return data is undefined', status: 200}
  } else if (type === 'object' && res !== null) {
    if(res.hasOwnProperty('data')) { // data is the key property
      Object.assign(resData, res)
    } else {
      resData.data = res;
    }
    resData.msg = res.msg||"";
    resData.errors = res.errors;
  } else {
    resData.msg = `data's type is ${typeof res}`;
    if(type === 'function'){
      resData.data = res();
    } else { // not function
      resData.data = res;
    }
  }
  resData.status = res.status || 200; // resData status code
  let status = resData.status; // http status code
  // if (status == 200 && ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
  //   status = 201;
  // }
  ctx.status = status;
  return ctx.body = resData;
};

const page = (ctx: Koa.Context) => (data: any) => {
    let resData = new ResponseData();
    if (typeof data === 'object' && data !== null) {
      const total = data.page[1] || 0
      const count = data.page[0].length || 0
      resData.data = data.page[0];
      let pageSize = ctx.query.pageSize ? ctx.query.pageSize*1 : 10;
      resData.meta = {
        total: total,
        count: count,
        page: ctx.query.page ? ctx.query.page*1 : 1,
        pageSize: pageSize,
        totalPage: Math.ceil(total/pageSize)
      };
      resData.msg = data.msg||`查询到${resData.meta.count}记录`;
    }
    resData.status = data.status || 200;
    ctx.status = resData.status;
    return ctx.body = resData;
};

const returnData = async (ctx: Koa.Context, next: () => Promise<any>) => {
  if (!ctx.Json){
    ctx.Json = json(ctx);
  }
  if (!ctx.Pages){
    ctx.Pages = page(ctx);
  }
  await next();
};

export default returnData;


// const returnData = async (ctx: any, next: any) => {
//   await next();
// }
// export default returnData;
