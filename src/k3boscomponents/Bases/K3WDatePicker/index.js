import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import './index.less';

class K3WDatePicker extends PureComponent() {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleChange, onOk, ...superProps } = this.prop;
    return (<DatePicker format="YYYY-MM-DD" placeholder="选择时间" onChange={handleChange} onOk={onOk} />);
  }
}
export default K3WDatePicker;
