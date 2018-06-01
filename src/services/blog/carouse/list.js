/**
 *创建时间:  2018/5/30
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import request from '../../../utils/request';

export async function queryBlogCarousels() {
  return request('/blogActicleBanner/', {
    method: 'GET',
  });
}
