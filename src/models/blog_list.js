/**
 *创建时间:  2018/5/30
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { queryBlogCarousels } from '../services/blog/carouse/list';

export default {
  namespace: 'blog_list',

  state: {
    carousel_status: undefined,
  },

  effects: {
    *getBlogCarousels(_, { put, call }) {
      const response = yield call(queryBlogCarousels);
      yield put({
        type: 'changeBlogCarouselsStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeBlogCarouselsStatus(state, { payload }) {
      return {
        ...state,
        carousels: payload,
        carousel_status: payload.length > 0 ? 'ok' : 'error',
      };
    },
  },
};
