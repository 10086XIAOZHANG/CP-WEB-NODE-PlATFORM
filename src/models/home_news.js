/**
 *创建时间:  2018/5/28
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { queryNews } from '../services/home/news/list';

export default {
  namespace: 'home_news',

  state: {
    status: undefined,
  },

  effects: {
    *getNews({ typeProps, count }, { put, call }) {
      console.log('typeProps, count', typeProps, count);
      const response = yield call(queryNews, typeProps, count);
      yield put({
        type: 'changeHomeNewListsStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeHomeNewListsStatus(state, { payload }) {
      return {
        ...state,
        news: payload,
        status: payload.length > 0 ? 'ok' : 'error',
      };
    },
  },
};
