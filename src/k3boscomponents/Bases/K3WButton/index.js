import React, { PureComponent } from 'react';
import { Button } from 'antd';
import './index.less';

class K3WButton extends PureComponent {
  render() {
    const { Text, ...superProps } = this.props;
    return (
      <Button type="primary" {...superProps} >
        {Text}
      </Button>
    );
  }
}
export default K3WButton;
