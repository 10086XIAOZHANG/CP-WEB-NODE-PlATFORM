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
  return request('/api/users/find', {
    method: 'POST',
    body: {
      username: params.username,
      pwd: params.pwd,
    },
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MjY5MDE3NjZ9.4_hQN5v7eKZufXVj4_VDSR1zzVBT30Hz09b2CW3-pOo',
    },
  });
}
// 用户退出了
export async function signOut() {
  // 清除TOKEN，模拟退出
  store.clearAll();
  return 'logout';
}

