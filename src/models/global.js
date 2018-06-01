/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { routerRedux } from 'dva/router';
import { messageError, messageSuccess, messageWarning } from '../utils/utils';

export default {
  namespace: 'global', // model 的命名空间，同时也是他在全局 state 上的属性，只能用字符串，不支持通过 . 的方式创建多层命名空间

  state: { // 初始值，优先级低于传给 dva() 的 opts.initialState。
    collapsed: false,
    messageStatus: false,
    tabActiveKey: '/dashboard/KdMainControl',
  },
  /**
   * 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，
   * 可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
   * '格式为 *(action, effects) => void 或 [*(action, effects) => void, { type }]。
   * type 类型有：
   *  takeEvery
   *  takeLatest
   *  throttle
   *  watcher
   */
  effects: {
    *watchAndPop(_, { put }) {
      const payload = { // 恢复初始值
        collapsed: false,
        siderWidth: 100,
        siderImgWidth: 25,
        messageStatus: false,
        tabActiveKey: '/dashboard/KdMainControl',
        menuList: [{ imgUrl: '../assets/basiclayout/sale.png', menuTitle: '首页', path: '/dashboard/KdMainControl', siderImgWidth: 25, key: '/dashboard/KdMainControl', closable: false }],
      };
      console.log('watchAndPop', payload);
      yield put({
        type: 'goBackDefaultState',
        payload,
      });
    },
    *watchAndRefreshList(_, { put }) {
      yield put(routerRedux.push('/'));
    },
    *changeErrorMessage({ payload }, { call, put }) {
      yield put({
        type: 'changeMessageStatus',
        payload: true,
      });
      const response = yield call(messageError, payload);
      yield put({
        type: 'changeMessageStatus',
        payload: response,
      });
    },
    *changeSuccessMessage({ payload }, { call, put }) {
      yield put({
        type: 'changeMessageStatus',
        payload: true,
      });
      const response = yield call(messageSuccess, payload);
      yield put({
        type: 'changeMessageStatus',
        payload: response,
      });
    },
    *changeWarningMessage({ payload }, { call, put }) {
      yield put({
        type: 'changeMessageStatus',
        payload: true,
      });
      const response = yield call(messageWarning, payload);
      yield put({
        type: 'changeMessageStatus',
        payload: response,
      });
    },
  },

  /**
   * 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
   * 格式为 (state, action) => newState 或 [(state, action) => newState, enhancer]。
   */
  reducers: {
    changeMessageStatus(state, { payload }) {
      return {
        ...state,
        messageStatus: payload,
      };
    },
    goBackDefaultState(state, { payload }) {
      return {
        ...state,
        messageStatus: payload.messageStatus,
        menuList: payload.menuList,
      };
    },
  },

  /**
   * 以 key/value 格式定义 subscription。subscription 是订阅，用于订阅一个数据源，
   * 然后根据需要 dispatch 相应的 action。在 app.start() 时被执行，数据源可以是当前的时间、
   * 服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
   * 格式为 ({ dispatch, history }, done) => unlistenFunction。
   * 注意：如果要使用 app.unmodel()，subscription 必须返回 unlisten 方法，用于取消数据订阅。
   */
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        console.log('history', history);
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
        if (history.action === 'POP') {
          console.log('history.action', history.action);
          dispatch({
            type: 'watchAndPop',
          });
          dispatch({
            type: 'watchAndRefreshList',
          });
        }
      });
    },
    watchAndRefreshList({ dispatch }) {
      dispatch({
        type: 'watchAndRefreshList',
      });
    },
  },
};
