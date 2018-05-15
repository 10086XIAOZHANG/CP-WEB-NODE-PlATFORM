/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import Rollbar from 'rollbar';

// 检测、诊断和调试错误
if (location.host === 'dva.sosout.com') {
  Rollbar.init({
    accessToken: 'a7bfb90e615c42cbb4bd11196ae23afd',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}
