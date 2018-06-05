/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import Cookies from 'js-cookie';
import cloneDeep from 'lodash/cloneDeep';
import { store } from './common/local.storage';
import LoadingBar from './components/Bases/LoadingBar';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';

// import styles from './index.less';
import Config from './common/config';

// 设置默认的加载组件
dynamic.setDefaultLoadingComponent(() => {
  return <LoadingBar speed={10} step={70} />;
});

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

// 登录验证
function requireAuth(Layout, props, passProps) {
  // 模拟token失效时间
  console.log(Cookies.get('token') && Cookies.get('id'));
  if (Cookies.get('token') && Cookies.get('id')) {
    store.set(Config.defaultProps.USER_TOKEN_TIMEOUT, (new Date().getTime()));
    store.set(Config.defaultProps.USER_TOKEN, Cookies.get('token'));
    store.set(Config.defaultProps.USER_ID, Cookies.get('id'));
  }
  const tokenTimeout = store.get(Config.defaultProps.USER_TOKEN_TIMEOUT);
  const token = store.get(Config.defaultProps.USER_TOKEN);
  const current = (new Date()).getTime();
  if (token && current - tokenTimeout < 7200000) {
    return <Layout {...props} {...passProps} />;
  } else {
    return <Redirect to="/user/login" />;
  }
}

function RouterConfig({ history, app }) {
  console.log('app详细信息', app);
  const navData = getNavData(app);
  const UserLayout = getLayout(navData, 'UserLayout').component;
  const BasicLayout = getLayout(navData, 'BasicLayout').component;
  const BlogLayout = getLayout(navData, 'BlogLayout').component;
  const passProps = {
    app,
    navData: navData.filter((item) => {
      return item.layout !== 'UserLayout';
    }), // 剔除掉无需登录模块
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
          <Route path="/blog" render={props => requireAuth(BlogLayout, props, passProps)} />
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
          <Redirect exact from="/" to="/main/Home" />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
