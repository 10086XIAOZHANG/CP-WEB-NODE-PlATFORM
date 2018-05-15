/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { routerRedux } from 'dva/router';
import { signIn, signOut, GetAcctList } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(signIn, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *getAcctList({ payload }, { call, put }) {
      const response = yield call(GetAcctList, payload);
      yield put({
        type: 'getAcctLists',
        payload: response,
      });
    },
    *logout(_, { call, put }) {
      const response = yield call(signOut);
      if (response) {
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    getAcctLists(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      console.log('登录成功', payload.Data);
      return {
        ...state,
        status: payload.Message === '登录成功' ? 'ok' : 'error',
        type: payload.type,
        info: payload,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        status: payload,
        submitting: payload,
      };
    },
  },
};
