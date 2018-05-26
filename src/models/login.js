/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { routerRedux } from 'dva/router';
import { store } from '../common/local.storage';
import Config from '../common/config';
import { auth } from '../services/auth';
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
      console.log('返回的是response', payload);
      const token = yield call(auth, payload);
      store.set(Config.defaultProps.USER_TOKEN, token);
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
      try {
        return {
          ...state,
          status: typeof payload !== 'string' ? (payload.length > 0 ? 'ok' : 'error') : '',
          info: payload,
        };
      } catch (err) {
        console.log(err);
      }
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
