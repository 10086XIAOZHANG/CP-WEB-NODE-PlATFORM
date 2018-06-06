/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { fetchPartialUserInfo } from '../services/userinfoCentered/userinfo/update';

export default {
  namespace: 'personal_centered',

  state: {
    carousel_status: undefined,
    acticle_list_status: undefined,
    article_publish_status: undefined,
  },

  effects: {
    *changePartialUserInfo({ params }, { put, call }) {
      const response = yield call(fetchPartialUserInfo, params);
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
  },

  reducers: {
    changePartialUserInfoStatus(state, { payload }) {
      return {
        ...state,
        partial_user_status: payload ? 'ok' : 'error',
      };
    },
    setPartialUserInfoStatus(state, { status }) {
      return {
        ...state,
        partial_user_status: status,
      };
    },
  },
};
