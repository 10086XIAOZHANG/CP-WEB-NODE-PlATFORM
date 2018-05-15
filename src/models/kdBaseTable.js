/**
 *创建时间:  2018/4/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { getBaseTableList } from '../services/bases/table/list';

export default {
  namespace: 'kdBaseTable',

  state: {},

  effects: {
    *getBaseTableList({ payload, path }, { call, put }) {
      const response = yield call(getBaseTableList, path, payload);
      yield put({
        type: 'changeBaseTableList',
        payload: response,
      });
    },
  },

  reducers: {
    changeBaseTableList(state, { payload }) {
      return {
        ...state,
        status: payload !== null ? 'ok' : 'error',
        type: payload.type,
        info: payload,
      };
    },
  },
};
