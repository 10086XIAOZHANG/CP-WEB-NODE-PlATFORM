/* eslint-disable no-underscore-dangle */
/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import '@babel/polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import browserHistory from 'history/createBrowserHistory';
import { persistStore, autoRehydrate, createPersistor } from 'redux-persist';
// import { createLogger } from 'redux-logger';
import localForage from 'localforage';
import { message } from 'antd';
import { config } from './utils/localForage';
import './rollbar';
import './index.less';
import router from './router';

// const proxy = require('http-proxy-middleware');
// 1. 创建应用，返回 dva 实例
const app = dva({
  history: browserHistory(),
  extraEnhancers: [autoRehydrate()],
  onError(e) {
    message.error(e.message, /* duration */3);
  },
  // onAction: createLogger({}),
});

// 2. 配置 hooks 或者注册插件
// 访问需要跨域的api资源
// app.use('/api', proxy({ target: 'http://localhost:80', changeOrigin: true }));
// 3. 注册 model
app.model(require('./models/global').default);

// 4. 注册路由表
app.router(router);

// 5. 启动应用
app.start('#root');

localForage.config({
  ...config,
});

persistStore(app._store, {
  storage: localForage,
  keyPrefix: 'webend:',
  whitelist: ['global'],
});

// secondaryPersistor
createPersistor(app._store, {
  keyPrefix: 'webend:',
  whitelist: ['global'],
});
