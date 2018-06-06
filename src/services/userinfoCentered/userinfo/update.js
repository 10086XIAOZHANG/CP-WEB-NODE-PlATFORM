
/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import request from '../../../utils/request';
import Config from '../../../common/config';
import { store } from '../../../common/local.storage';

export async function fetchPartialUserInfo(params) {
  return request(`/users/${store.get(Config.defaultProps.USER_ID)}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${store.get(Config.defaultProps.USER_TOKEN)}`,
    },
    body: {
      name: params.name,
      gender: params.gender,
      birthday: params.birthday,
      email: params.email,
      mobile: params.mobile,
    },
  });
}

