/**
 *创建时间:  2018/4/25
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Input, Button, Switch, Table, Select } from 'antd';
import _ from 'lodash';
import styles from './style.less';

class ColumnsCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      searchText: '',
      selectedRowKeys: [],
      tableInfo: this.props.tableInfo,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tableInfo: nextProps.tableInfo,
    });
  }
  onChange=(checked, index) => {
    console.log(`switch to ${checked}${index}`);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleChange=(value) => {
    console.log(`selected ${value}`);
    return false;
  }
  render() {
    console.log(this.state.filterDropdownVisible + this.state.tableInfo);
    _.forEach(this.state.tableInfo.columnsInfo, (item, key) => {
      console.log('this.state.tableInfo.columnsInfo', item);
      console.log('key', key);
      if (item.filterDropdown && item.filterDropdown !== '') {
        this.state.tableInfo.columnsInfo[key].filterDropdown = (
          <div className={styles['custom-filter-dropdown']}>
            <Input
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>搜索</Button>
          </div>
        );
        this.state.tableInfo.columnsInfo[key].filterDropdownVisible =
          this.state.filterDropdownVisible;
        this.state.tableInfo.columnsInfo[key].onFilterDropdownVisibleChange
          = visible => this.setState({ filterDropdownVisible: visible });
      }
      if (item.render && item.render !== '') {
        console.log('item.dataIndex', item.dataIndex);
        switch (item.dataIndex) {
          case 'columnAlign':
            this.state.tableInfo.columnsInfo[key].render = () => (
              <Select defaultValue="默认" style={{ width: '100%' }} onSelect={() => { return false; }} onChange={this.handleChange}>
                <Select.Option value="默认">默认</Select.Option>
                <Select.Option value="左对齐">左对齐</Select.Option>
                <Select.Option value="右对齐">右对齐</Select.Option>
              </Select>
            );
            break;
          case 'checked':
            this.state.tableInfo.columnsInfo[key].render = () => (
              <Switch defaultChecked={false} onChange={() => { this.onChange(); }} />
            );
            break;
          default:
            break;
        }
      }
    });
    const columnsTitle = this.state.tableInfo.columnsInfo;
    console.log(columnsTitle);
    const columnsData = this.state.tableInfo.columns;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Table rowSelection={rowSelection} columns={columnsTitle} dataSource={columnsData} />
      </div>
    );
  }
}

export default ColumnsCell;

