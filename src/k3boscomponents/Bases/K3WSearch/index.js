import React, { PureComponent } from 'react';
import { Input, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './index.less';
class K3WSearch extends PureComponent {
  render() {
    const { onSearch, ...superProps } = this.props;
    return (
      <Input
        {...superProps}
        addonAfter={
          <Button type="default" shape="circle" size="small" style={{ border: 1 }} onClick={onSearch}>
            <Icon type="search" />
          </Button>}
      />
    );
  }
}
K3WSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default K3WSearch;
