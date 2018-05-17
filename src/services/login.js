/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import Store from 'store';
import request from '../utils/request';

// 用户登录
export async function signIn(params) {
  return request('/api/users/find', {
    method: 'POST',
    body: {
      username: params.username,
      pwd: params.pwd,
    },
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MjY1NjkyOTF9.2zh4bmmf1zGL8o7X0Dpy-Duodu4qg5WCwQjVFfFGq_0',
    },
  });
}
// 用户退出了
export async function signOut() {
  // 清除TOKEN，模拟退出
  Store.clearAll();
  return true;
}

