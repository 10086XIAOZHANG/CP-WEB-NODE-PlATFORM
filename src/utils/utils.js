/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import { message } from 'antd';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(start, end) {
  return (new Date(end).getTime() - new Date(start).getTime()) / 1000;
}
export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '-';
  const seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  const currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
  } ${date.getHours()}${seperator2}${date.getMinutes()
  }${seperator2}${date.getSeconds()}`;
  return currentdate;
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

// 弹窗未完全关闭禁止再次提交 失败
export function messageError(payload, duration = 3) {
  return new Promise((resolve) => {
    message.error(payload, duration, () => {
      resolve(false);
    });
  });
}
// 自定义全局弹窗 成功
export function messageSuccess(payload, duration = 3) {
  return new Promise((resolve) => {
    message.success(payload, duration, () => {
      resolve(false);
    });
  });
}
// 自定义全局弹窗 警告
export function messageWarning(payload, duration = 3) {
  return new Promise((resolve) => {
    message.warning(payload, duration, () => {
      resolve(false);
    });
  });
}
