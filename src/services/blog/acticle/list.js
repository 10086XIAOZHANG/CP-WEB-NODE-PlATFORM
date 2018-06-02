/**
 *创建时间:  2018/5/30
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { stringify } from 'qs';
import request from '../../../utils/request';
import { store } from '../../../common/local.storage';
import Config from '../../../common/config';

export async function queryBlogActicles(params) {
  return request(`/blogActicle/?${stringify(params)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.get(Config.defaultProps.USER_TOKEN)}`,
    },
  });
}
export async function queryBlogActicleDetails(id) {
  return request(`/blogActicle/${id}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.get(Config.defaultProps.USER_TOKEN)}`,
    },
  });
}

