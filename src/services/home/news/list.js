/**
 *创建时间:  2018/5/28
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import request from '../../../utils/request';

export async function queryNews(typeProps, count) {
  return request(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${typeProps}&count=${count}`, {
    method: 'GET',
  }, true);
}
