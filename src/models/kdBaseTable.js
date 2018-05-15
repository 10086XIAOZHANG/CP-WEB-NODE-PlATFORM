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
    *setBaseTableColumns({ payload }, { put }) {
      yield put({
        type: 'setBaseTableColumnsSuccess',
        payload,
      });
    },
    *getBaseTableList({ payload, path }, { call, put }) {
      const response = yield call(getBaseTableList, path, payload);
      yield put({
        type: 'changeBaseTableList',
        payload: response,
      });
      // yield put({
      //   type: 'setBaseTableSettingColumns',
      //   payload: response.info.columnsInfo,
      // });
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
    setBaseTableSettingColumns(state, { payload }) {
      return {
        ...state,
        status: payload !== null ? 'ok' : 'error',
        tableColumnsInfo: payload,
      };
    },
  },
};
