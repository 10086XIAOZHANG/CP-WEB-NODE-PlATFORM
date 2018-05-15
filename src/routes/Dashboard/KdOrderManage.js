/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'dva';
import MonitorCard from '../../components/BasicLayout/OrderManageCard';
@connect(state => ({
  chart: state.chart,
}))
export default class KdOrderManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {}

  componentWillUnmount() {
  }
  enterWorkspace= () => {
    this.props.dispatch({
      type: 'kdOrderManage/enterWorkPlace',
    });
  }
  render() {
    return (
      <div>
        <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
          <Row>
            <Col offset={1} span={3}><MonitorCard title="销售订单-新增" imgUrl={require('../../assets/basiclayout/order.png')} enterWorkspace={this.enterWorkspace} /></Col>
            <Col span={3}><MonitorCard title="销售订单-维护" imgUrl={require('../../assets/basiclayout/order.png')} /></Col>
            <Col span={3}><MonitorCard title="销售订单执行情况汇总表" imgUrl={require('../../assets/basiclayout/order.png')} /></Col>
            <Col span={3}><MonitorCard title="销售订单进度跟踪" imgUrl={require('../../assets/basiclayout/order.png')} /></Col>
            <Col span={3}><MonitorCard title="" imgUrl={require('../../assets/basiclayout/plus.png')} /></Col>
          </Row>
        </Card>

      </div>
    );
  }
}
