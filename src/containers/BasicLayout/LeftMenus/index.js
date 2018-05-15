/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import LeftMenuCard from '../../../components/BasicLayout/LeftMenu';

class LeftMenus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leftMenu: this.props.leftMenu,
    };
  }
  getDefaultCollapsedSubMenus() {
    this.collapses = [];
    for (const item of this.state.leftMenu) {
      this.collapses.push(<LeftMenuCard
        menuTitle={item.menuTitle}
        imgUrl={item.imgUrl}
        siderImgWidth={item.siderImgWidth}
      />);
    }
    return this.collapses;
  }
  render() {
    return (
      <div>
        {this.getDefaultCollapsedSubMenus()}
      </div>
    );
  }
}

export default LeftMenus;
