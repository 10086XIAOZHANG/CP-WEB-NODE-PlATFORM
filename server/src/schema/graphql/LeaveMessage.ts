import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNullableType,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLNonNull,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
} from 'graphql';
import {Context} from '@core/koa'
import * as Moment from 'moment'
import LeaveMsgCtrl from '../../controllers/LeaveMessageController'
import { metaFields, pageArgsFields } from './common'

// leaveMessage
export const leaveMessageObjectType = new GraphQLObjectType({
  name: 'leaveMessage',
  fields: {
    id: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    parentId: {
      type: GraphQLString
    },
    ip: {
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

// leaveMessage pages type
const LeaveMsgPagesType = new GraphQLObjectType({
  name: 'leaveMsgPageType',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(leaveMessageObjectType)
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  leaveMsg: {
    type: leaveMessageObjectType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const leaveMsg = await LeaveMsgCtrl.getById(id)
      return leaveMsg
    }
  },
  leaveMsgs: {
    type: LeaveMsgPagesType,
    args: {
      ...pageArgsFields,
      description: {
        name: 'description',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await LeaveMsgCtrl.pages(args)
      return Object.assign({
        list: pages[0],
        total: pages[1],
        ...args
      });
    }
  }
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  leaveMessage: {
    type: leaveMessageObjectType,
    args: {
      description: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      return {}
    }
  }
}

export default {
  query,
  mutation
};