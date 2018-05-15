/**
 *创建时间:  2018/4/27
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { getSubModuleMeunsData } from '../services/menus/subModule/list';

export default {
  namespace: 'menu',

  state: {
    subMenus: [],
    menuName: '',
    subMenuName: '',
  },

  effects: {
    *getSubModuleMeuns({ menuName, subMenuName }, { call, put }) {
      const response = yield call(getSubModuleMeunsData);
      yield put({
        type: 'changeSubModuleMeuns',
        payload: response,
        menuName,
        subMenuName,
      });
      yield put({
        type: 'global/enter',
        payload: response.data[menuName][subMenuName][0],
      });
    },
  },

  reducers: {
    changeSubModuleMeuns(state, { payload, menuName, subMenuName }) {
      return {
        ...state,
        status: payload !== null ? 'ok' : 'error',
        msg: payload.msg,
        subMenuInfo: payload,
        menuName,
        subMenuName,
      };
    },
  },
};

