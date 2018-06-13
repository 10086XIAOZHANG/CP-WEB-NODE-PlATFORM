/**
 *创建时间:  2018/6/2
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { publicLeaveMsg } from '../services/blog/leavemsg/add';
import { queryUserLeavingMessage } from '../services/blog/leavemsg/list';

export default {
  namespace: 'blog_leave_msg',

  state: {
    blog_leave_msg_public_status: undefined,
    blog_leave_msg_status: undefined,
  },

  effects: {
    *publicMsg({ params }, { put, call }) {
      const response = yield call(publicLeaveMsg, params);
      yield put({
        type: 'changeUserLeavingMessagePublicStatus',
        payload: response,
      });
    },
    *queryUserLeavingMessage({ params }, { put, call }) {
      const response = yield call(queryUserLeavingMessage, params);
      yield put({
        type: 'changeUserLeavingMessageStatus',
        payload: response,
      });
    },
    *changeBlogLeaveMsgStatus({ status }, { put }) {
      yield put({
        type: 'changeAfterBlogLeaveMsgStatus',
        payload: status,
      });
    },
  },

  reducers: {
    changeAfterBlogLeaveMsgStatus(state, { payload }) {
      return {
        ...state,
        blog_leave_msg_public_status: payload,
        blog_leave_msg_status: payload,
      };
    },
    changeUserLeavingMessagePublicStatus(state, { payload }) {
      return {
        ...state,
        leavingMessages: payload,
        blog_leave_msg_public_status: payload ? 'ok' : 'error',
      };
    },
    changeUserLeavingMessageStatus(state, { payload }) {
      return {
        ...state,
        leavingMessagesList: payload,
        blog_leave_msg_status: payload.length > 0 ? 'ok' : 'error',
      };
    },
  },
};
