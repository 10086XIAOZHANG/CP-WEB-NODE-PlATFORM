/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card } from 'antd';
@connect(state => ({
  chart: state.chart,
}))
export default class KdMainControl extends PureComponent {
  state = {}

  componentDidMount() {}

  componentWillUnmount() {
  }
  changeLayoutSiderState = () => {
    this.props.dispatch({
      type: 'global/changeLayoutSiderState',
      siderwidth: 100,
      siderimgwidth: 32,
      collapsed: true,
    });
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: true,
    });
    this.props.dispatch({
      type: 'kdMainControl/enterOrder',
    });
  }
  render() {
    return (
      <div>
        <Row style={{ marginBottom: 16 }}>
          <Card style={{ width: '100%', height: 112 }}>
            <Col offset={1} span={3}>
              <Button type="primary" ghost style={{ width: 120, height: 45 }} onClick={this.changeLayoutSiderState.bind(this)}>订单管理</Button>
            </Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>合同管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发货管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发票管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>库存查询</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>报表管理</Button></Col>
          </Card>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Card style={{ width: '100%', height: 112 }}>
            <Col offset={1} span={3}>
              <Button type="primary" ghost style={{ width: 120, height: 45 }}>订单管理</Button>
            </Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>合同管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发货管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发票管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>库存查询</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>报表管理</Button></Col>
          </Card>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Card style={{ width: '100%', height: 112 }}>
            <Col offset={1} span={3}>
              <Button type="primary" ghost style={{ width: 120, height: 45 }}>订单管理</Button>
            </Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>合同管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发货管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发票管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>库存查询</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>报表管理</Button></Col>
          </Card>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Card style={{ width: '100%', height: 112 }}>
            <Col offset={1} span={3}>
              <Button type="primary" ghost style={{ width: 120, height: 45 }}>订单管理</Button>
            </Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>合同管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发货管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发票管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>库存查询</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>报表管理</Button></Col>
          </Card>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Card style={{ width: '100%', height: 112 }}>
            <Col offset={1} span={3}>
              <Button type="primary" ghost style={{ width: 120, height: 45 }}>订单管理</Button>
            </Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>合同管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发货管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>发票管理</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>库存查询</Button></Col>
            <Col span={3}><Button type="primary" ghost style={{ width: 120, height: 45 }}>报表管理</Button></Col>
          </Card>
        </Row>
      </div>
    );
  }
}
