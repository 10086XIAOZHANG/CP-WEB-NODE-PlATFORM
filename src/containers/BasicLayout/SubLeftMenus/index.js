/**
 *创建时间:  2018/4/27
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import _ from 'lodash';
import LeftMenus from '../LeftMenus';
import Config from '../../../common/config';

class SubLeftMenus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subMenus: [],
      menuName: '',
      subMenuName: '',
      siderImgWidth: this.props.siderImgWidth,
      collapsed: this.props.collapsed,
    };
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.menus.subMenuInfo) {
      this.setState({
        subMenus: nextProp.menus.subMenuInfo.data,
        menuName: nextProp.menus.menuName,
        subMenuName: nextProp.menus.subMenuName,
        siderImgWidth: nextProp.siderImgWidth,
        collapsed: nextProp.collapsed,
      });
    }
    console.log('nextProp.siderImgWidth', nextProp.siderImgWidth);
  }
  getActiveLeftMenu=() => {
    if (this.state.menuName && this.state.menuName !== '') {
      _.forEach(this.state.subMenus[this.state.menuName][this.state.subMenuName], (item, key) => {
        this.state.subMenus[this.state.menuName][this.state.subMenuName][key].siderImgWidth
          = this.state.siderImgWidth;
      });
      console.log(this.state.subMenus[this.state.menuName][this.state.subMenuName]);
      return this.state.subMenus[this.state.menuName][this.state.subMenuName];
    }
  }
  render() {
    const defaultLeftMenu = [{
      menuTitle: '全部',
      imgUrl: 'http://k3web.kingdee.com:8085/main/all.svg',
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '销售云',
      imgUrl: `${Config.defaultProps.resource_server}/main/salecloud.svg`,
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '采购云',
      imgUrl: `${Config.defaultProps.resource_server}main/purchasecloud.svg`,
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '仓存云',
      imgUrl: `${Config.defaultProps.resource_server}/main/savecloud.svg`,
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '委外云',
      imgUrl: `${Config.defaultProps.resource_server}/main/outsourcecloud.svg`,
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '核算云',
      imgUrl: `${Config.defaultProps.resource_server}/main/accountscloud.svg`,
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '参数设置',
      imgUrl: `${Config.defaultProps.resource_server}/main/setting.svg`,
      siderImgWidth: this.state.siderImgWidth,
    },
    ];
    let activeLeftMenu = [{
      menuTitle: '采购订单',
      imgUrl: '',
      siderImgWidth: 32,
    },
    {
      menuTitle: '采购申请单',
      imgUrl: '',
      siderImgWidth: 32,
    }];
    activeLeftMenu = this.getActiveLeftMenu() || activeLeftMenu;
    return (
      <div>
        {!this.state.collapsed && <LeftMenus leftMenu={defaultLeftMenu} />}
        {this.state.collapsed && <LeftMenus leftMenu={activeLeftMenu} />}
      </div>
    );
  }
}

export default SubLeftMenus;

