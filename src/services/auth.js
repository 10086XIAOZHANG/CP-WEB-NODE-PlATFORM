/**
 *创建时间:  2018/5/26
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import request from '../utils/request';

// 用户登录
export async function auth(params) {
  return request('/api/authenticate', {
    method: 'POST',
    body: {
      username: params.username,
      pwd: params.pwd,
    },
  });
}
