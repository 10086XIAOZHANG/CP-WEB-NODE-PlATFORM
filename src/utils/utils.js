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

export function loadImg(file) {
  const reader = new FileReader();

  let imgFile;


  reader.onload = function (e) {
    imgFile = e.target.result;
    console.log(imgFile);
    return imgFile;
  };


  reader.readAsDataURL(file);
}

export function getBase64Image(canvasImg) {
  const canvas = canvasImg;
  const dataURL = canvas.toDataURL('image/png');
  return dataURL; // return dataURL.replace("data:image/png;base64,", "");
}
export function base64ToBlob(urlData) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
  // 去掉url的头，并转化为byte
  const bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  const ia = new Uint8Array(ab);

  for (let i = 0; i < bytes.length; i += 1) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], {
    type: mime,
  });
}
export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const mime = arr[0].match(/:(.*?);/)[1];
  const u8arr = new Uint8Array(n);

  while (n -= 1) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
