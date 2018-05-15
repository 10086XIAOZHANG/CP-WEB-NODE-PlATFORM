/**
 *创建时间:  2018/4/11
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Row, Col, Select, Card } from 'antd';

class OrderDetailsBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleChange=(value) => {
    console.log(`selected ${value}`);
  }
  render() {
    return (
      <div>
        <Card style={{ width: '100%' }}>
          <Row type="flex" justify="start">
            <Col span={2}>
              <Select defaultValue="新增" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="add">新增</Select.Option>
                <Select.Option value="copy">复制</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <Select defaultValue="修改" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="update">修改</Select.Option>
                <Select.Option value="del">删除</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <Select defaultValue="启动审核" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="add">启动审核</Select.Option>
                <Select.Option value="copy">审核</Select.Option>
                <Select.Option value="reb">驳回</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <Select defaultValue="下推" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="add">下推</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <Select defaultValue="引入引出" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="add">引入引出</Select.Option>
                <Select.Option value="add">附件</Select.Option>
                <Select.Option value="add">按模板引出到Excel</Select.Option>
                <Select.Option value="add">按模板从Excel引入</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <Select defaultValue="打印" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="add">打印</Select.Option>
                <Select.Option value="add">打印设置</Select.Option>
                <Select.Option value="add">套打设置</Select.Option>
                <Select.Option value="add">打印预览</Select.Option>
                <Select.Option value="add">二维码打印</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <Select defaultValue="关联查询" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="add">关联查询</Select.Option>
                <Select.Option value="add">上查</Select.Option>
                <Select.Option value="add">下查</Select.Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default OrderDetailsBar;
