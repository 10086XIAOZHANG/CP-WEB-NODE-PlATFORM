/**
 *创建时间:  2018/4/23
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import FilterModel from '../../../k3boscomponents/InitialValues/FilterModel/index';

class KdFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <FilterModel />
      </div>
    );
  }
}

export default KdFilter;
