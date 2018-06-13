/**
 *创建时间:  2018/6/2
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { stringify } from 'qs';
import request from '../../../utils/request';
import { store } from '../../../common/local.storage';
import Config from '../../../common/config';

export async function queryUserLeavingMessage(params) {
  return request(`/userLeavingMessage/?${stringify(params)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.get(Config.defaultProps.USER_TOKEN)}`,
    },
  });
}
