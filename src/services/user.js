/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

// import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCurrent(params) {
  console.log('这是user请求', params);
  return request('/api/users/find', {
    method: 'POST',
    body: {
      username: params.username,
      pwd: params.pwd,
    },
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MjcyNjA5NDN9.IE4BzlROxy9mb4JhJGo2hAwgCOw-1BWW9YFbbUhtZD0',
    },
  });
}
