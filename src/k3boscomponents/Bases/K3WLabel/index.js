import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class K3WLabel extends PureComponent {
  render() {
    const { value, ...superProps } = this.props;
    return (
      <span {...superProps} >
        {value}
      </span>
    );
  }
}
K3WLabel.propTypes = {
  value: PropTypes.string.isRequired,
};
export default K3WLabel;
