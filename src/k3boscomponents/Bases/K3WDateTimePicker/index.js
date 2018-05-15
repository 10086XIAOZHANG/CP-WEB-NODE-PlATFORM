import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import './index.less';

class K3WDateTimePicker extends PureComponent() {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleChange, onOk, ...superProps } = this.prop;
    return (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" onChange={handleChange} onOk={onOk} />);
  }
}
export default K3WDateTimePicker;

