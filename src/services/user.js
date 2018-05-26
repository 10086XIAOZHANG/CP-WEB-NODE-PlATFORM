/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

// import { stringify } from 'qs';
import request from '../utils/request';
import { store } from '../common/local.storage';
import Config from '../common/config';

export async function queryCurrent(params) {
  return request('/api/users/find', {
    method: 'POST',
    body: {
      username: params.username,
      pwd: params.pwd,
    },
    headers: {
      Authorization: `Bearer ${store.get(Config.defaultProps.USER_TOKEN)}`,
    },
  });
}
