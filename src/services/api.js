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
  return request(params, {
    method: 'POST',
  }, true);
}
// 账套列表
export async function GetAcctList(address) {
  return request(`${address}/wmsapi/api/Sys/GetAcctList?page=1&pageSize=2000&filter=&order=`, {
    method: 'POST',
  }, true);
}
// 用户退出了
export async function signOut() {
  // 清除TOKEN，模拟退出
  Store.clearAll();
  return true;
}

