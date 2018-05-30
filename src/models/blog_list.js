/**
 *创建时间:  2018/5/30
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { queryBlogCarousels } from '../services/blog/carouse/list';
import { queryBlogActicles } from '../services/blog/acticle/list';

export default {
  namespace: 'blog_list',

  state: {
    carousel_status: undefined,
    acticle_list_status: undefined,
  },

  effects: {
    *getBlogCarousels(_, { put, call }) {
      const response = yield call(queryBlogCarousels);
      yield put({
        type: 'changeBlogCarouselsStatus',
        payload: response,
      });
    },
    *getBlogActicleLists({ params }, { put, call }) {
      const response = yield call(queryBlogActicles, params);
      yield put({
        type: 'changeBlogActiclesStatus',
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
    changeBlogActiclesStatus(state, { payload }) {
      return {
        ...state,
        acticleList: payload,
        acticle_list_status: payload && payload.results.length > 0 ? 'ok' : 'error',
      };
    },
  },
};
