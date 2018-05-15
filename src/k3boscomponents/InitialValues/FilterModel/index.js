/**
 *创建时间:  2018/4/23
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Popover, Button, Icon, Tabs } from 'antd';
import ConditionCell from '../../../components/Bases/Filter/ConditionCell';
import SchemeCell from '../../../components/Bases/Filter/SchemeCell';
import ColumnsCell from '../../../components/Bases/Table/ColumnsCell';

class FilterModel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      btnTxt: '过滤',
      iconType: 'down-circle',
      visible: false,
      tableInfo: this.props.tableInfo,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tableInfo: nextProps.tableInfo,
    });
  }
  handleVisibleChange = (visible) => {
    if (visible) {
      this.setState({ btnTxt: '收起过滤', iconType: 'up-circle', visible: !this.state.visible });
    } else {
      this.setState({ btnTxt: '过滤', iconType: 'down-circle', visible: !this.state.visible });
    }
  }
  render() {
    const content = (
      <div>
        <Tabs defaultActiveKey="1" >
          <Tabs.TabPane tab="过滤方案设置" key="1">
            <ConditionCell />
            <ConditionCell />
            <ConditionCell />
            <div style={{ marginBottom: 20 }} />
            <SchemeCell />
          </Tabs.TabPane>
          <Tabs.TabPane tab="显示隐藏列" key="2">
            <ColumnsCell tableInfo={this.state.tableInfo} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
    return (
      <div>
        <Popover placement="bottom" content={content} visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
          <Button type="primary" > {this.state.btnTxt}&nbsp;&nbsp;&nbsp;&nbsp;<Icon type={this.state.iconType} /></Button>
        </Popover>
      </div>
    );
  }
}

export default FilterModel;
