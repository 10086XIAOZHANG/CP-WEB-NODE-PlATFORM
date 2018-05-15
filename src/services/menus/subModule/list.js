/**
 *创建时间:  2018/4/27
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import request from '../../../utils/request';

export async function getSubModuleMeunsData() {
  return request('/menu/getSubModuleMeun');
}

