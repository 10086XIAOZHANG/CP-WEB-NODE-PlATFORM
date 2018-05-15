/**
 *创建时间:  2018/4/13
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { getOrderSaleList } from '../services/orderManagementDetails/sale/list';

export default {
  namespace: 'kdOrderSaleList',

  state: {},

  effects: {
    *getOrderSaleList({ payload }, { call, put }) {
      const response = yield call(getOrderSaleList, payload);
      yield put({
        type: 'changeOrderSaleList',
        payload: response,
      });
    },
  },

  reducers: {
    changeOrderSaleList(state, { payload }) {
      return {
        ...state,
        status: payload !== null ? 'ok' : 'error',
        type: payload.type,
        info: payload,
      };
    },
  },
};

