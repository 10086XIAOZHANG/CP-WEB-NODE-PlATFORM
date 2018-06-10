/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { store } from '../common/local.storage';
import request from '../utils/request';

// 用户登录
export async function signIn(params) {
  console.log('用户登录', params);
  return request('/login/', {
    method: 'POST',
    body: {
      username: params.username,
      password: params.pwd,
    },
  });
}


// 用户退出了
export async function signOut() {
  // 清除TOKEN，模拟退出
  store.clearAll();
  window.location.reload();
  return 'logout';
}

