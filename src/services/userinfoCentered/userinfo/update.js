
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
  console.log('修改用户数据', params);
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

export async function updateAvatar(params) {
  // const user = store.get(Config.defaultProps.USER_INFO);
  console.log('blob', params.avatar);
  const data = new FormData();
  // data.append('name', user.name);
  // data.append('gender', user.gender);
  // data.append('birthday', user.birthday);
  // data.append('email', user.email);
  // data.append('mobile', user.email);
  data.append('avatar', new File([params.avatar], 'avatar.png', { type: 'image/png' }));

  console.log(data);
  return request(`/users/${store.get(Config.defaultProps.USER_ID)}/`, {
    method: 'PATCH',
    headers: {
      // processData: false,
      // contentType: false,
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${store.get(Config.defaultProps.USER_TOKEN)}`,
    },
    body: data,
  }, false, true);
}
