import { getMainModuleMeunsData } from '../services/menus/module/list';

export default {
  namespace: 'mainMenu',

  state: {
    mainMenu: [],
    msg: '',
  },

  effects: {
    *getMainModuleMeuns(payload, { call, put }) {
      console.log(2);
      const response = yield call(getMainModuleMeunsData);
      yield put({
        type: 'changeMainModuleMeuns',
        payload: response,
      });
    },
  },

  reducers: {
    changeMainModuleMeuns(state, { payload }) {
      console.log(3);
      return {
        ...state,
        status: payload !== null ? 'ok' : 'error',
        msg: payload.msg,
        mainMenu: payload.data,
      };
    },
  },
};

