/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
@connect(state => ({
  chart: state.chart,
  mainMenu: state.mainMenu,
}))
export default class KdMainControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        aa
      </div>
    );
  }
}
