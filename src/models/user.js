/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import Cookies from 'js-cookie';
import { queryCurrent, registerIn, queryMsgCode } from '../services/user';
import { store } from '../common/local.storage';
import Config from '../common/config';

export default {
  namespace: 'user',
  state: {
    currentUser: {},
    status: undefined,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent, store.get(Config.defaultProps.USER_ID) || Cookies.get('id'));
      store.set(Config.defaultProps.USER_AVATAR, response.avatar);
      store.set(Config.defaultProps.USER_INFO, response);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchMsgCode({ phoneNumber }, { put, call }) {
      const response = yield call(queryMsgCode, phoneNumber);
      yield put({
        type: 'saveSendCaptStatus',
        payload: response,
      });
      console.log(phoneNumber);
    },
    *changeStatus({ status }, { put }) {
      yield put({
        type: 'changeStatus',
        status,
      });
    },
    *changeCaptStatus({ status }, { put }) {
      yield put({
        type: 'changeSendCaptStatus',
        status,
      });
    },
    *registerSubmit({ payload }, { call, put }) {
      const response = yield call(registerIn, payload);
      store.set(Config.defaultProps.USER_TOKEN, response.token);
      store.set(Config.defaultProps.USER_TOKEN_TIMEOUT, (new Date().getTime()));
      store.set(Config.defaultProps.USER_ID, response.user_id);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
  },

  reducers: {
    saveSendCaptStatus(state, { payload }) {
      return {
        ...state,
        captStatus: payload ? 'ok' : 'error',
      };
    },
    changeStatus(state, { status }) {
      return {
        ...state,
        status,
      };
    },
    changeSendCaptStatus(state, { status }) {
      return {
        ...state,
        captStatus: status,
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload,
        status: payload ? 'ok' : 'error',
      };
    },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload && payload.token ? 'ok' : 'error',
      };
    },
  },
};
