/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import fetch from 'dva/fetch';
import { notification } from 'antd';
import Config from '../common/config';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} isUpload 是否上传文件
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(sUrl, options, isAbsolute = false, isUpload = false) {
  let url;
  if (!isAbsolute) {
    url = Config.defaultProps.api + sUrl;
  } else {
    url = sUrl;
  }
  const defaultOptions = {
    mode: 'cors',
    // cache: 'force-cache', 表示fetch请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 除非没有任何缓存, 那么它将发送一个正常的request.
    // credentials: 'include', Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!isAbsolute) {
      newOptions.headers = {
        'Content-Type': 'application/json',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }
  if (newOptions.method === 'PATCH') {
    if (!isUpload) {
      newOptions.headers = {
        'Content-Type': 'application/json',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else if (isUpload) {
      newOptions.headers = {
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => { return response.json(); })
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
