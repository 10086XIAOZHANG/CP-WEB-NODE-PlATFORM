import React, { PureComponent } from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class K3WDropDown extends PureComponent() {
  render() {
    const { handleMenuClick, items, ...superProps } = this.props;
    const menu = (
      <Menu onClick={handleMenuClick}>
        {items.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
          Button <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}
K3WDropDown.propTypes = {
  handleMenuClick: PropTypes.func.isRequired,
};

export default K3WDropDown;
