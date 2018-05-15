/**
 *创建时间:  2018/4/11
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { stringify } from 'qs';
import request from '../../../utils/request';
import { store } from '../../../common/local.storage';
import Config from '../../../common/config';
// 序时簿列表加载
export async function getBaseTableList(path, params) {
  // return request(`${path}?${stringify(params)}`, {
  //   method: 'POST',
  //   body: params,
  // });
  const p = params;
  p.acctid = store.get(Config.defaultProps.ACCT_ID);
  p.SessionKey = store.get(Config.defaultProps.SESSION_KEY);
  return request(`${path}?${stringify(p).replace('?', '')}`, {
    method: 'POST',
  }, true);
}
