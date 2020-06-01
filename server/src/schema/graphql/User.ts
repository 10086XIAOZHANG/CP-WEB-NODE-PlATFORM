import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNullableType,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
  GraphQLNonNull,
} from 'graphql';
import {Context} from '@core/koa'
import * as Moment from 'moment'
import UserCtrl from '../../controllers/UserController'
import { metaFields, pageArgsFields } from './common'

// user
export const userObjectType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    nickName: {
      type: GraphQLString
    },
    userType: {
      type: GraphQLInt
    },
    sex: {
      type: GraphQLInt
    },
    remark: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString,
      resolve(obj, args, ctx, info){
        const createdAt = Number(obj.createdAt) || Date.now()
        return Moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    createdBy: {
      type: GraphQLString
    }
  }
})

// user pages type
const UserPagesType = new GraphQLObjectType({
  name: 'userPageType',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(userObjectType)
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  user: {
    type: userObjectType,
    args: {
      id: {
        name: 'id',
        type: GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const article = await UserCtrl.getById(id)
      return article
    }
  },
  users: {
    type: UserPagesType,
    args: {
      ...pageArgsFields,
      username: {
        type: GraphQLString
      },
      nickName: {
        type: GraphQLString
      },
      userType: {
        type: GraphQLInt
      },
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await UserCtrl.pages(args)
      return Object.assign({
        list: pages[0],
        total: pages[1],
        ...args
      });
    }
  }
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  user: {
    type: userObjectType,
    args: {
      username: {
        type: GraphQLNonNull(GraphQLString)
      },
      nickName: {
        type: GraphQLNonNull(GraphQLString)
      },
      password: {
        type: GraphQLNonNull(GraphQLString)
      },
      userType: {
        type: GraphQLNonNull(GraphQLInt)
      },
      sex: {
        type: GraphQLNonNull(GraphQLInt)
      },
      remark: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await UserCtrl.insert(args, ctx)
      return result
    }
  },
  editUser: {
    type: userObjectType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLString)
      },
      username: {
        type: GraphQLNonNull(GraphQLString)
      },
      nickName: {
        type: GraphQLNonNull(GraphQLString)
      },
      password: {
        type: GraphQLString
      },
      userType: {
        type: GraphQLNonNull(GraphQLInt)
      },
      sex: {
        type: GraphQLNonNull(GraphQLInt)
      },
      remark: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await UserCtrl.update(args, ctx)
      return result
    }
  }
}

export default {
  query,
  mutation
};