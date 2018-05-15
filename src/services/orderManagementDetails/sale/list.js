/**
 *创建时间:  2018/4/11
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { stringify } from 'qs';
import request from '../../../utils/request';

// 序时簿列表加载
export async function getOrderSaleList(path, params) {
  return request(`${path}?${stringify(params)}`, {
    method: 'POST',
    body: params,
  });
}
