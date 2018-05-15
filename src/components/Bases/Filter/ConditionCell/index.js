/**
 *创建时间:  2018/4/23
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Row, Col, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './style.less';

class ConditionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Row type="flex" gutter={3} justify="start" className={styles['margin-btn-5']}>
        <Col span={4} order={1}>{this.props.firstConditionView}</Col>
        <Col span={4} order={2}>{this.props.secondConditionView}</Col>
        <Col span={4} order={3}>{this.props.thirdConditionView}</Col>
        <Col span={4} offset={1} order={4}><Button icon="close-circle" /></Col>
      </Row>
    );
  }
}
ConditionCell.propTypes = {
  firstConditionView: PropTypes.element,
  secondConditionView: PropTypes.element,
  thirdConditionView: PropTypes.element,
};
ConditionCell.defaultProps = {
  firstConditionView: (
    <Select defaultValue="订单号">
      <Select.Option value="订单号">订单号
      </Select.Option>
    </Select>),
  secondConditionView: (
    <Select defaultValue="不等于">
      <Select.Option value="等于">等于
      </Select.Option>
      <Select.Option value="不等于">不等于
      </Select.Option>
      <Select.Option value="为空">为空
      </Select.Option>
    </Select>),
  thirdConditionView: <Input />,
};
export default ConditionCell;
