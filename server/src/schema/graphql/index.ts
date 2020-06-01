import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  Thunk,
  GraphQLFieldConfigMap,
  Source
} from 'graphql';
import {Context} from '@core/koa'
import Article from './Article'
import ArticleType from './ArticleType'
import Comment from './Comment'
import Tag from './Tag'
import User from './User'
import LeaveMsg from './LeaveMessage'

let count = 0
const demo: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  count: {
    type: GraphQLInt,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt // 参数不为空
      }
    },
    resolve: (obj, args, ctx, info) => {
      ++count;
      return count;
    }
  },
}

const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      ...demo,
      ...Article.query,
      ...ArticleType.query,
      ...Comment.query,
      ...Tag.query,
      ...User.query,
      ...LeaveMsg.query
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      ...Article.mutation,
      ...ArticleType.mutation,
      ...Comment.mutation,
      ...Tag.mutation,
      ...User.mutation,
      ...LeaveMsg.mutation
    }
  })
})


export {
  RootSchema
};
