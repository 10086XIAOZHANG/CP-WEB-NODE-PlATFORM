/**
 *创建时间:  2018/4/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Input, Modal, Icon, Table } from 'antd';
import styles from './style.less';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];

class F7Model extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: this.props.title,
      selectedRowKeys: [], // Check here to configure the default column
    };
  }

  componentDidMount() {
    for (let i = 0; i < 26; i += 1) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  setModalVisible=(modalVisible) => {
    this.setState({ modalVisible });
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const suffix = <Icon type="search" onClick={() => this.setModalVisible(true)} />;
    return (
      <div>
        <Input
          style={{ width: 200 }}
          suffix={suffix}
        />
        <Modal
          title={this.state.title}
          className={[styles['vertical-center-modal']]}
          width={1000}
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Modal>
      </div>
    );
  }
}

export default F7Model;
