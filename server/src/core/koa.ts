
import {Context as KoaContext} from 'koa'

export interface Context extends KoaContext {
  // post fields
  fields?: object

  // session
  session?: object

  // request
  getParams?: {
    offset: number
    limit: number
  }

  // response
  Json?: Function
  Pages?: Function
}


