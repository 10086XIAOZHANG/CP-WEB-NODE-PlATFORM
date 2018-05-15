import React, { PureComponent } from 'react';
import { Modal, Table, Card, Row, Col, Tree } from 'antd';
import K3WSearch from '../K3WSearch';
import styles from './index.less';

export default class K3WF7Modal extends PureComponent {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  onOk=() => {
    /* 回传到后端-》后端更新数据并返回结果-》回调进行界面state数据更新刷新界面 */
    this.setState({ show: false });
  }
  onCancel=() => {
    this.setState({ show: false });
  }
  showModal = () => {
    this.setState({ show: true });
  }
  render() {
    const { title, F7type, F7param, ...otherProps } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'aa',
        fixed: 'left',
        width: 60,
        key: 'aa',
        render: () => <a href="#">#</a>,
      },
      {
        title: '物料编号*',
        dataIndex: 'bb',
        key: 'bb',
      },
      {
        title: '物料名称*',
        dataIndex: 'cc',
        key: 'cc',
      },
    ];
    const data = [{
      key: '1',
      aa: 'John Brown',
      bb: 32,
      cc: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      aa: 'Jim Green',
      bb: 42,
      cc: 'London No. 1 Lake Park',
    },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
      }),
    };
    return (
      <Modal
        title={title}
        onOk={this.onOk}
        onCancel={this.onCancel}
        width={900}
        className={[styles['vertical-center-modal']]}
        visible={this.state.show}
        {...otherProps}
      >
        <Row>
          <Col span={4}>
            <Card style={{ height: 450 }}>
              <Tree>
                <Tree.TreeNode title="parent 1" key="0-0">
                  <Tree.TreeNode title="parent 1-0" key="0-0-0">
                    <Tree.TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                    <Tree.TreeNode title="leaf" key="0-0-0-1" />
                  </Tree.TreeNode>
                  <Tree.TreeNode title="parent 1-1" key="0-0-1">
                    <Tree.TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                  </Tree.TreeNode>
                </Tree.TreeNode>
              </Tree>
            </Card>
          </Col>
          <Col span={20}>
            <Card style={{ height: 450 }}>
              <Row style={{ marginBottom: 10 }}>
                <K3WSearch />
              </Row>
              <Row>
                <Table rowSelection={rowSelection} size="small" columns={columns} dataSource={data} />
              </Row>
            </Card>
          </Col>
        </Row>
      </Modal>
    );
  }
}
