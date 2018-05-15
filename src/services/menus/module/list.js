import request from '../../../utils/request';

export async function getMainModuleMeunsData() {
  return request('/menu/getModuleMeuns');
}

