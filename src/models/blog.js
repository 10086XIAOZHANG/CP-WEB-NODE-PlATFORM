/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { routerRedux } from 'dva/router';

export default {
  namespace: 'blog',

  state: [],

  effects: {
    *enterOrder(_, { put }) {
      yield put(routerRedux.push('/dashboard/KdOrderManagementDetails'));
    },
  },

  reducers: {
  },
};

