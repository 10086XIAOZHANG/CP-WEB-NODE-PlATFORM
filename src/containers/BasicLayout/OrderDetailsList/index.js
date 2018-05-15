/**
 *创建时间:  2018/4/11
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import KdTable from '../../Bases/KdTable';
import KdTableFilterPlan from '../../Bases/KdTableFilterPlan';
import { store } from '../../../common/local.storage';
import Config from '../../../common/config';

@connect(state => ({
  kdOrderSaleList: state.kdOrderSaleList,
  global: state.global,
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
    const tablePath = `${store.get(Config.defaultProps.K3_DB_ADDRESS)}/WMSApi/api/WebList/GetListData`;
    return (
      <div>
        <Card style={{ width: '100%' }}>
          <KdTableFilterPlan />
          <div style={{ marginBottom: 20 }} />
          {/* <KdTable path="/order/getSaleList" /> */}
          <KdTable path={tablePath} />
          <div style={{ marginBottom: 20 }} />
        </Card>
      </div>
    );
  }
}

export default OrderDetailsList;
