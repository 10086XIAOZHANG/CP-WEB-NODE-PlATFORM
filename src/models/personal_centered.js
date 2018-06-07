/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { fetchPartialUserInfo, updateAvatar } from '../services/userinfoCentered/userinfo/update';
import Config from '../common/config';
import { store } from '../common/local.storage';

export default {
  namespace: 'personal_centered',

  state: {
  },

  effects: {
    *changePartialAvatar({ params }, { put, call }) {
      const response = yield call(updateAvatar, params);
      yield put({
        type: 'changePartialPartialAvatar',
        payload: response,
      });
    },
    *changePartialUserInfo({ params }, { put, call }) {
      const response = yield call(fetchPartialUserInfo, params);
      store.set(Config.defaultProps.USER_INFO, response);
      store.set(Config.defaultProps.USER_AVATAR, response.avatar);
      yield put({
        type: 'user/saveCurrentUser',
        payload: response,
      });
      yield put({
        type: 'changePartialUserInfoStatus',
        payload: response,
      });
    },
    *changePartialStatus({ status }, { put }) {
      yield put({
        type: 'setPartialUserInfoStatus',
        status,
      });
    },
    *changeAvatarStatus({ status }, { put }) {
      yield put({
        type: 'setPartialAvatarStatus',
        status,
      });
    },
  },

  reducers: {
    changePartialUserInfoStatus(state, { payload }) {
      return {
        ...state,
        currentUser: payload,
        partial_user_status: payload ? 'ok' : 'error',
      };
    },
    changePartialPartialAvatar(state, { payload }) {
      return {
        ...state,
        currentUser: payload,
        partial_avatar_status: payload ? 'ok' : 'error',
      };
    },
    setPartialUserInfoStatus(state, { status }) {
      return {
        ...state,
        partial_user_status: status,
      };
    },
    setPartialAvatarStatus(state, { status }) {
      return {
        ...state,
        partial_avatar_status: status,
      };
    },
  },
};
