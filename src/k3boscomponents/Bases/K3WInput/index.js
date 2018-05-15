import React, { PureComponent } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class K3WInput extends PureComponent {
  state = {
    value: this.props.value,
    editable: true,
  };
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };
  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { title, ...superProps } = this.props;
    const { value, editable } = this.state;
    return (
      <span>
        <span>{title}</span>
        {
          editable ?
            (<Input
              value={value}
              onChange={this.handleChange}
              {...superProps}
            />)
            : (<Input value={value} disabled />)
        }
      </span>
    );
  }
}

K3WInput.propTypes = {
  title: PropTypes.string.isRequired,
};
export default K3WInput;
