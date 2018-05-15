import React, { PureComponent } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class K3WInput extends PureComponent {
  render() {
    const { title, ...superProps } = this.props;
    return (
      <span>
        <span>{title}</span>
        <Input {...superProps} />
      </span>
    );
  }
}

K3WInput.propTypes = {
  title: PropTypes.string.isRequired,
};
export default K3WInput;
