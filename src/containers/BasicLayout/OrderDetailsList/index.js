/**
 *创建时间:  2018/4/11
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { connect } from 'dva';
import KdTable from '../../Bases/KdTable';

@connect(state => ({
  kdOrderSaleList: state.kdOrderSaleList,
}))
class OrderDetailsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <KdTable path="/order/getSaleList" />
      </div>
    );
  }
}

export default OrderDetailsList;
