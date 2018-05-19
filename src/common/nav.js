/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:我们为了统一方便的管理路由和页面的关系，将配置信息统一抽离到 common/nav.js 下，同时应用动态路由
 */

import dynamic from 'dva/dynamic';

// dynamic包装 函数
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login', 'home'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页',
    path: '/',
    children: [
      {
        name: 'Main',
        icon: 'main',
        path: 'main',
        children: [
          {
            name: '主页',
            path: 'home',
            component: dynamicWrapper(app, [], () => import('../routes/Main/Home')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '账户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, ['blog'], () => import('../layouts/BlogLayout')),
    path: '/blog',
    layout: 'BlogLayout',
    children: [
      {
        name: '博客',
        icon: 'blog',
        path: 'blog',
        children: [
          {
            name: '主页',
            path: 'index',
            component: dynamicWrapper(app, [], () => import('../routes/BlogList/Index')),
          },
          {
            name: '写博',
            path: 'editor',
            component: dynamicWrapper(app, [], () => import('../routes/BlogEditor/Index')),
          },
          {
            name: '归档',
            path: 'archives',
            component: dynamicWrapper(app, [], () => import('../routes/BlogArchives/Index')),
          },
          {
            name: '标签',
            path: 'tags',
            component: dynamicWrapper(app, [], () => import('../routes/BlogTags/Index')),
          },
          {
            name: '链接',
            path: 'links',
            component: dynamicWrapper(app, [], () => import('../routes/BlogLinks/Index')),
          },
          {
            name: '留言',
            path: 'leaveMsg',
            component: dynamicWrapper(app, [], () => import('../routes/BlogLeaveMsg/Index')),
          },
          {
            name: '留言',
            path: 'abouts',
            component: dynamicWrapper(app, [], () => import('../routes/BlogAbouts/Index')),
          },
        ],
      },
    ],
  },
];
