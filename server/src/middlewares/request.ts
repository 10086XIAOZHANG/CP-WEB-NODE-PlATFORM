import * as Koa from '@core/koa'

interface IFilter {
  col: string
  val: string
  exp: string
}
interface IOrder {
  col: string
  dir: string
}

// xpoineer
// import moment from 'moment';

// const setCreatedAt = (filter) => {
//   let arr = [];
//   if (toString.call(filter.val) === '[object Array]') {
//     arr = filter.val.map((v) => {
//       if (filter.col === 'created_at')
//         return moment(v).format('x');
//       return v;
//     });
//   }
//   if (typeof filter.val === 'string') {
//     arr = filter.val ? filter.val.split(',').map((v) => {
//       if (filter.col === 'created_at')
//         return moment(v).format('x');
//       return v;
//     }) : [];
//   }
//   return arr;
// };

const getParams = (ctx: Koa.Context) => {
  const data: any = {};
  let query = ctx.query;
  if (query && Object.keys(query).length>0) {
    data['limit'] = (query.pageSize ? query.pageSize : 10) * 1;
    let page = (query.page ? query.page : 1) - 1;//offset start 0(如果不存在则只返回一条)
    let offset = (query.page < 1 ? 0 : page) * data['limit'];
    data['offset'] = offset * 1;
    /*filter*/
    if (query['filter'] && query['filter'].length > 0) {
      data['where'] = {};
      for (let filter of query['filter']) {
        if (filter.col === '_orFilter_') {
          data['where']['$or'] = filter.val;
        } else {
          switch (filter.exp) {
            case '=':
              data['where'][filter.col] = filter.val;break;
            case '>':
              data['where'][filter.col] = { $gt: filter.val };break;
            case '>=':
              data['where'][filter.col] = { $gte: filter.val };break;
            case '<':
              data['where'][filter.col] = { $lt: filter.val };break;
            case '<=':
              data['where'][filter.col] = { $lte: filter.val };break;
            case 'in':
              data['where'][filter.col] = { $in: filter.val.split(',') };break;
            case '!=':
              data['where'][filter.col] = { $ne: filter.val };break;
            case 'or':
              data['where'][filter.col] = { $or: filter.val };break;
            case 'like':
                data['where'][filter.col] = { $like: `%${filter.val}%` };break;
            case 'between':
              data['where'][filter.col] = { $between: filter.val };break;
            default: // exp: '='
              data['where'][filter.col] = filter.val;break;
          }
        }
      }
    }
    /*order*/
    if (query['orderBy'] && query['orderBy'].length>0) {
      data['order'] = [];
      let orders = query['orderBy'].map((o: IOrder): string[] => {
        return [o.col, o.dir];
      });
      data['order'] = orders;
    }
  }
  return data;
};

let requestData = async (ctx: Koa.Context, next: () => Promise<any>) => {
  // if (!ctx.getParams){
  ctx.getParams = getParams(ctx);
  // }
  await next();
};

export default requestData;
// const requestData = async (ctx: any, next: any) => {
//   await next();
// }
// export default requestData;
