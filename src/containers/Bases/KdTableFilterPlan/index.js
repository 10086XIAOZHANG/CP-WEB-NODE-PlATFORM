/**
 *创建时间:  2018/5/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Form, Button, Row, Col, Input } from 'antd';
import KdFilter from '../KdFilter/index';

class FilterPlan extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
    };
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 12 },
      wrapperCol: { span: 10 },
    } : null;
    return (
      <div>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={16}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item
                label="方案名称:"
                {...formItemLayout}
              >
                <Button>默认方案</Button>
              </Form.Item>
              <Form.Item>
                <Button>方案一</Button>
                <Button style={{ marginLeft: 6 }}>方案二</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}><div style={{ float: 'left', width: '76%' }} > <Input placeholder="请输入单据编号、物料编号/名称/规格型号" /></div> <div style={{ float: 'left', marginLeft: 5 }} ><KdFilter /></div></Col>
        </Row>
      </div>
    );
  }
}

export default FilterPlan;
