/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(state => ({
  monitor: state.monitor,
}))
export default class BasicForms extends PureComponent {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div>
      基础表单
      </div>
    );
  }
}
