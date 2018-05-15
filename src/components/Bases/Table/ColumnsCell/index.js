/**
 *创建时间:  2018/4/25
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Input, Button, Switch, Table, Select } from 'antd';
import styles from './style.less';

class ColumnsCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      searchText: '',
      selectedRowKeys: [],
    };
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
    const columnsTitle = [{
      title: '序号',
      dataIndex: 'id',
      sorter: true,
      width: '10%',
    }, {
      title: '列名',
      dataIndex: 'title',
      filterDropdown: (
        <div className={styles['custom-filter-dropdown']}>
          <Input
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      width: '20%',
    }, {
      title: '列宽',
      dataIndex: 'width',
      filterDropdown: (
        <div className={styles['custom-filter-dropdown']}>
          <Input
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      width: '20%',
    }, {
      title: '对齐方式',
      dataIndex: 'columnAlign',
      render: () => (
        <Select defaultValue="默认" style={{ width: '100%' }} onSelect={() => { return false; }} onChange={this.handleChange}>
          <Select.Option value="默认">默认</Select.Option>
          <Select.Option value="左对齐">左对齐</Select.Option>
          <Select.Option value="右对齐">右对齐</Select.Option>
        </Select>
      ),
      filterDropdown: (
        <div className={styles['custom-filter-dropdown']}>
          <Input
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      width: '20%',
    }, {
      title: '隐藏列',
      dataIndex: 'checked',
      render: (text, record, index) => (
        <Switch defaultChecked={false} onChange={() => { this.onChange(index); }} />
      ),
      filterDropdown: (
        <div className={styles['custom-filter-dropdown']}>
          <Input
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      width: '20%',
    }];
    const columnsData = [
      {
        id: 1,
        filters: [
          {
            text: 'billno', value: '12',
          },
        ],
        dataIndex: 'billno',
        expanded: '',
        rendered: 'a',
        sorter: true,
        title: '编码',
        width: '45%',
        checked: '',
      },
      {
        id: 2,
        filters: [
          {
            text: 'measureunitsid', value: '14',
          },
        ],
        dataIndex: 'name',
        expanded: '',
        rendered: 'a',
        sorter: true,
        title: '名称',
        width: '35%',
        checked: '',
      },
      {
        id: 3,
        filters: [
          {
            text: 'billno', value: '12',
          },
        ],
        dataIndex: 'measureunitsid',
        expanded: '/f7/aa',
        rendered: '',
        sorter: true,
        title: '计量数量',
        width: '15%',
        checked: '',
      },
    ];
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

