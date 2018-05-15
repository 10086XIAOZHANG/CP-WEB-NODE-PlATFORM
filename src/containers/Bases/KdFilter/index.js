/**
 *创建时间:  2018/4/23
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { connect } from 'dva';
import FilterModel from '../../../k3boscomponents/InitialValues/FilterModel/index';

@connect(state => ({
  kdBaseTable: state.kdBaseTable,
}))
class KdFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      kdTableInfo: this.props.kdBaseTable.info,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      kdTableInfo: nextProps.kdBaseTable.info,
    });
  }

  render() {
    return (
      <div>
        <FilterModel tableInfo={this.state.kdTableInfo} />
      </div>
    );
  }
}

export default KdFilter;
