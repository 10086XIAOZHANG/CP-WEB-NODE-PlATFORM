import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import './index.less';

class K3WCheckBox extends PureComponent() {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleChange, ...superProps } = this.props;
    return (<Checkbox defaultChecked={this.props.checked} onChange={handleChange} />);
  }
}
export default K3WCheckBox;
