/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { queryCurrent } from '../services/user';

export default {
  namespace: 'user',
  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent({ username }, { call, put }) {
      const response = yield call(queryCurrent, username);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload[0],
      };
    },
  },
};
