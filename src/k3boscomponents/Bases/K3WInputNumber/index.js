import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';
import './index.less';

class K3WInputNumber extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<InputNumber />);
  }
}
export default K3WInputNumber;
