/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Icon, Row, Col } from 'antd';
import OrderDetailsBar from '../../containers/BasicLayout/OrderDetailsBar';
import OrderDetailsList from '../../containers/BasicLayout/OrderDetailsList';
import KdFilter from '../../containers/Bases/KdFilter';
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
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  getContent=(key) => {
    if (key === '1') {
      return (
        <div>
          <KdFilter />
        </div>);
    } else if (key === '2') {
      return (
        <div>
          <OrderDetailsBar />
          <OrderDetailsList />
        </div>);
    }
  }
  render() {
    const panes = [
      { title: '销售订单-新增', content: this.getContent('1'), key: '1' },
      { title: '销售订单-序时簿', content: this.getContent('2'), key: '2' },
    ];
    return (
      <div>
        <Row>
          <Col span={1}>
            <Tabs type="card">
              <Tabs.TabPane tab={<Icon style={{ width: 30, height: 12, fontSize: 18 }} type="home" />} key="1" />
            </Tabs>
          </Col>
          <Col span={23}>
            <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {panes.map(pane =>
                (<Tabs.TabPane tab={pane.title} key={pane.key}>{pane.content}</Tabs.TabPane>))}
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
