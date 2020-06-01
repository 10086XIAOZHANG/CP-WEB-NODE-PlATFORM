import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLInputObjectType,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
  GraphQLFieldConfigArgumentMap
} from 'graphql';
import {Context} from '@core/koa'

export const PageDataType = new GraphQLObjectType({
  name: 'pageData',
  fields: {
    current: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['page'] || 1
      }
    },
    page: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['page'] || 1
      }
    },
    pageSize: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['pageSize']
      }
    },
    total: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['total']
      }
    },
    totalPage: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return Math.ceil((obj['total'] || 0)/(obj['pageSize']))
      }
    }
  }
})

export const PageOrderType = new GraphQLInputObjectType({
  name: 'pageOrder',
  fields: {
    createdAt: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
  }
})


// 计算返回分页数据
export const metaFields: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  meta: {
    type: PageDataType,
    resolve(obj, args, ctx, info){
      const pageInfo = {}
      pageInfo['total'] = obj['total']
      pageInfo['curSize'] = obj['list'].length
      pageInfo['page'] = obj['page']
      pageInfo['pageSize'] = obj['pageSize']
      return pageInfo
    }
  },
}

// 获取参数
export const pageArgsFields: GraphQLFieldConfigArgumentMap = {
  page: {
    type: GraphQLInt,
    defaultValue: 1,
  },
  pageSize: {
    type: GraphQLInt,
    defaultValue: 10
  },
  order: {
    type: PageOrderType,
    defaultValue: {'createdAt': 'DESC'}
  },
  createdAt: {
    type: new GraphQLList(GraphQLString)
  }
}