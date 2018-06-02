/**
 *创建时间:  2018/5/30
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { queryBlogCarousels } from '../services/blog/carouse/list';
import { queryBlogActicles, queryBlogActicleDetails } from '../services/blog/acticle/list';
import { publishActicles } from '../services/blog/acticle/add';

export default {
  namespace: 'blog_list',

  state: {
    carousel_status: undefined,
    acticle_list_status: undefined,
    article_publish_status: undefined,
  },

  effects: {
    *publicActicle({ params }, { put, call }) {
      console.log('onPublicActicle1');
      const response = yield call(publishActicles, params);
      yield put({
        type: 'changePublishActiclesStatus',
        payload: response,
      });
    },
    *getBlogCarousels(_, { put, call }) {
      const response = yield call(queryBlogCarousels);
      yield put({
        type: 'changeBlogCarouselsStatus',
        payload: response,
      });
    },
    *getBlogActicleLists({ params }, { put, call }) {
      const response = yield call(queryBlogActicles, params);
      yield put({
        type: 'changeBlogActiclesStatus',
        payload: response,
      });
    },
    *getBlogActicleDetails({ id }, { put, call }) {
      const response = yield call(queryBlogActicleDetails, id);
      yield put({
        type: 'changeBlogActicleDetailsStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeBlogCarouselsStatus(state, { payload }) {
      return {
        ...state,
        carousels: payload,
        carousel_status: payload.length > 0 ? 'ok' : 'error',
      };
    },
    changeBlogActiclesStatus(state, { payload }) {
      return {
        ...state,
        acticleList: payload,
        acticle_list_status: payload && payload.results.length > 0 ? 'ok' : 'error',
      };
    },
    changePublishActiclesStatus(state, { payload }) {
      return {
        ...state,
        article_publish_status: payload ? 'ok' : 'error',
      };
    },
    changeBlogActicleDetailsStatus(state, { payload }) {
      return {
        ...state,
        article_detail_data: payload,
        article_details_status: payload ? 'ok' : 'error',
      };
    },
  },
};
