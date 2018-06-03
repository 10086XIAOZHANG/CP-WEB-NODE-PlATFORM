/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { routerRedux } from 'dva/router';

export default {
  namespace: 'blog',

  state: {},

  effects: {
    *enterOrder(_, { put }) {
      yield put(routerRedux.push('/dashboard/KdOrderManagementDetails'));
    },
    *changeBlogActicleSearch({ searchText }, { put }) {
      yield put({
        type: 'changeBlogActicleSearchStatus',
        payload: searchText,
      });
    },
  },

  reducers: {
    changeBlogActicleSearchStatus(state, { payload }) {
      return {
        ...state,
        blogActicleSearchText: payload,
        blog_acticle_search_status: payload && payload !== '' ? 'ok' : 'error',
      };
    },
  },
};

