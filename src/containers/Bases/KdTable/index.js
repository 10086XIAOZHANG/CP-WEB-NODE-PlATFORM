/**
 *创建时间:  2018/4/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 封装Ant Design Table
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Input, Select } from 'antd';
import { connect } from 'dva';
import EditableCell from '../../../components/Bases/Table/EditableCell';
import KdTableStatus from '../../Bases/KdTableStatus';
import styles from './style.less';

@connect(state => ({
  kdBaseTable: state.kdBaseTable,
}))
class KdTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      kdBaseTableList: {},
      pagination: {
        pageIndex: 1,
        pageSize: this.props.pageSize,
        total: 0,
        showQuickJumper: true },
      loading: false,
      columns: null,
      pageSize: this.props.pageSize,
    };
  }
  componentDidMount() {
    this.fetch();
  }
  componentWillReceiveProps(nextProps) {
    // 列表获取数据成功
    if (nextProps.kdBaseTable.status === 'ok') {
      const newColumus = [];
      console.log('nextProps.kdBaseTable.info.Data results', nextProps.kdBaseTable.info.Data[1].results);
      for (const column of nextProps.kdBaseTable.info.Data[0].columns) {
        if (column.rendered && column.rendered !== '') {
          column.render = (text, record, index) => (
            <EditableCell
              value={text}
              onChange={this.onCellChange(index, column.rendered)}
            />
          );
        }
        if (column.expanded && column.expanded !== '') {
          column.render = (text, record, index) => (
            <Input.Search
              style={{ width: '100%' }}
              onSearch={() => console.log(index)}
            />
          );
        }
        newColumus.push(column);
      }
      this.setState({ columns: newColumus });
      this.setState({
        loading: false,
        kdBaseTableList: nextProps.kdBaseTable.info.Data[1],
      });
      const pagination = { ...this.state.pagination };
      // total来自server results
      pagination.total = nextProps.kdBaseTable.info.Data[1].results.length;
      this.setState({
        loading: false,
        pagination,
      });
    }
  }
  onCellChange = (index, key) => {
    return (value) => {
      this.state.kdBaseTableList.results[index][key] = value;
      this.setState({ kdBaseTableList: this.state.kdBaseTableList });
    };
  }
  onRowClick =(record, index) => {
    this.props.onRowClick(record, index);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    this.props.onSelectChange();
  }
  onPageSizeChange =(value) => {
    this.state.pagination.pageSize = value;
    this.fetch({
      results: value,
      page: this.state.pagination.current,
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    const pagination = { ...this.state.pagination };
    // Read total count from server
    // pagination.total = data.totalCount;
    const data = {
      results: this.state.pageSize,
      ...params,
    };
    this.props.dispatch({
      type: 'kdBaseTable/getBaseTableList',
      payload: data,
      path: this.props.path,
    });
    this.setState({
      loading: true,
      pagination,
    });
  }
  initRowClassName=(record, index) => {
    console.log('initRowClassName', record, index);
    const className = 'initRowClassName';
    return className;
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    this.state.pagination.showTotal = () =>
      (
        <span>
          <span style={{ color: '#999' }}>
                        每页显示
            <Select
              value={`${this.state.pagination.pageSize}`}
              onChange={this.onPageSizeChange}
              className="euler-select"
              dropdownClassName="euler-select-dropdown"
              size="default"
              style={{
                  width: 80,
                  margin: '0 5px',
                }}
            >
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="20">20</Select.Option>
              <Select.Option value="30">30</Select.Option>
              <Select.Option value="40">40</Select.Option>
              <Select.Option value="50">50</Select.Option>
            </Select>
                        条，
          </span>
                    共{this.state.pagination.total}条
        </span>);
    return (
      <div className={styles['kd-table']} >
        {this.state.columns === null ?
          <Spin size="large" className={styles['kd-table-spin']} /> :
          <div>
            <Table
              columns={this.state.columns}
              rowKey={record => record.billno}
              dataSource={this.state.kdBaseTableList.results}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              onRowClick={this.onRowClick}
              scroll={{ x: 8300 }}
              rowSelection={rowSelection}
              rowClassName={record => record.className}
            />
            <KdTableStatus />
          </div>
        }
      </div>
    );
  }
}
KdTable.propTypes = {
  pageSize: PropTypes.number,
  path: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
  onSelectChange: PropTypes.func,
};
KdTable.defaultProps = {
  pageSize: 6,
  onRowClick: (record, index) => {
    console.log('record', record);
    console.log('index', index);
  },
  onSelectChange: () => {
    console.log('onKdTableSelectChange', 'onKdTableSelectChange');
  },
};
export default KdTable;

