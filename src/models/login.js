/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { routerRedux } from 'dva/router';
import { store } from '../common/local.storage';
import Config from '../common/config';
import { signIn, signOut } from '../services/login';

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
      store.set(Config.defaultProps.USER_TOKEN, response.token);
      store.set(Config.defaultProps.USER_TOKEN_TIMEOUT, (new Date().getTime()));
      store.set(Config.defaultProps.USER_ID, response.user_id);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout(_, { call, put }) {
      const response = yield call(signOut);
      if (response) {
        yield put({
          type: 'changeLogoutState',
          payload: response,
        });
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLogoutState(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload && payload.token ? 'ok' : 'error',
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        info: payload,
      };
    },
  },
};
