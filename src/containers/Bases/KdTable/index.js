/**
 *创建时间:  2018/4/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 封装Ant Design Table
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Input } from 'antd';
import { connect } from 'dva';
import EditableCell from '../../../components/Bases/Table/EditableCell';
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
      pagination: {},
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
      for (const column of nextProps.kdBaseTable.info.columns) {
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
        kdBaseTableList: nextProps.kdBaseTable.info,
      });
      const pagination = { ...this.state.pagination };
      // total来自server results
      pagination.total = nextProps.kdBaseTable.info.results.length;
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
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles['kd-table']} >
        {this.state.columns === null ?
          <Spin size="large" className={styles['kd-table-spin']} /> :
          <Table
            columns={this.state.columns}
            rowKey={record => record.registered}
            dataSource={this.state.kdBaseTableList.results}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            onRowClick={this.onRowClick}
            rowSelection={rowSelection}
          />
        }
      </div>
    );
  }
}
KdTable.propTypes = {
  pageSize: PropTypes.string,
  path: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
  onSelectChange: PropTypes.func,
};
KdTable.defaultProps = {
  pageSize: 10,
  onRowClick: (record, index) => {
    console.log('record', record);
    console.log('index', index);
  },
  onSelectChange: () => {
    console.log('onKdTableSelectChange', 'onKdTableSelectChange');
  },
};
export default KdTable;

