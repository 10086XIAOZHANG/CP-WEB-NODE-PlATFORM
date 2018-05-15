/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class K3WAutoComplete extends PureComponent() {
  constructor(props) {
    super(props);
    this.props = { ...props };
    this.options = props.dataSource.map(item => (
      <option key={item.FKey} FDSPKey={item.FDSPFieldName} FFNDKey={item.FFNDFieldName}>
        {item.FDSPFieldName}
        <span className=".certain-search-item-fndname">{item.FFNDFieldName}</span>
      </option>));
  }
  handleChange = (value) => {
    console.log('onChange', value);
  }
  handleSearch = (value) => {
    console.log('onSearch', value);
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps', '');
  }
  render() {
    return (
      <div style={{ width: 250 }}>
        <label title={this.props.FCaption}>
          <AutoComplete
            disable={this.props.disable}
            allowClear
            backfill
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 300 }}
            size="large"
            dataSource={this.options}
            placeholder="input here"
            optionLabelProp="FDSPKey"
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            onSearch={this.handleSearch}
          >
            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
          </AutoComplete>
        </label>
      </div>
    );
  }
}
K3WAutoComplete.propTypes = {
  handleMenuClick: PropTypes.func.isRequired,
};

export default K3WAutoComplete;
