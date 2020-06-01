import * as Koa from '../core/koa'
import {
  graphql,
  parse,
  Source,
  validate
} from 'graphql'
import {schema} from '../schema/demo'
import {Delay} from '../utils/tools/index'

export const world = async (ctx: Koa.Context) => {
  await Delay(1000)
  ctx.Json('world')
}

export const MyGraphql = async (ctx: Koa.Context) => {
  const params = ctx.body
  console.log(ctx.body, ctx.params, ctx.query)
  const source = new Source(ctx.query, 'GraphQL request')
  console.log('source: ', source)
  const result = await graphql(schema, ctx.query.query)
  const err = result.errors || []
  for(let i = 0; i < err.length; i ++){
    console.log('err: ', i, err[i].message, err[i].locations, err[i].stack)
  }
  // console.log('graphql: ', result.data, Object.prototype.toString.call(err))
  ctx.Json({data: result.data, errors: err.length > 0 ? err[0].stack.split('\n') : undefined})
}
