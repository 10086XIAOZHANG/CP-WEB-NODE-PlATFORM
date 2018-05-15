import React, { PureComponent } from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import K3WF7Modal from '../K3WF7Modal';
import './index.less';

export default class K3WF7Input extends PureComponent {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      modal: null,
    };
  }
  onRef=(modal) => {
    this.setState({ modal });
  }
  onClick=(e) => {
    e.stopPropagation();
    this.state.modal.showModal();
  }
  onSelect = (value) => {
    console.log('onSelect', value);
  }
  handleChange = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  render() {
    const { dataSource } = this.state;
    const suffix = <Icon type="search" onClick={this.onclick} />;
    return (
      <span>
        <AutoComplete
          suffix={suffix}
          dataSource={dataSource}
          style={{ width: 200 }}
          onSelect={this.onSelect}
          onChange={this.handleChange}
        >
          <Input suffix={<Icon onClick={this.onClick} type="search" className="certain-category-icon" />} />
        </AutoComplete>
        <K3WF7Modal title="物料" ref={this.onRef} />
      </span>
    );
  }
}
