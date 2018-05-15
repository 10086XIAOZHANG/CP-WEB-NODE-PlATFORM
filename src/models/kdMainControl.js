/**
 *创建时间:  2018/4/10
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { routerRedux } from 'dva/router';

export default {
  namespace: 'kdMainControl',

  state: [],

  effects: {
    *enterOrder(_, { put }) {
      yield put(routerRedux.push('/dashboard/KdOrderManage'));
    },
  },

  reducers: {
  },
};
