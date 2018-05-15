/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import OrderDetailsBar from '../../containers/BasicLayout/OrderDetailsBar';
import OrderDetailsList from '../../containers/BasicLayout/OrderDetailsList';
@connect(state => ({
  kdOrderSaleList: state.kdOrderSaleList,
}))
export default class KdOrderManagementDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'global/changeLayoutSiderState',
      collapsed: 'true',
      siderwidth: 100,
      siderimgwidth: 32,
    });
  }
  componentDidMount() {
  }
  getContent=() => {
    return (
      <div>
        <OrderDetailsBar />
        <div style={{ marginBottom: 20 }} />
        <OrderDetailsList />
      </div>);
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            {this.getContent()}
          </Col>
        </Row>
      </div>
    );
  }
}
