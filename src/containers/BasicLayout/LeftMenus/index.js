/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import LeftMenuCell from '../../../components/BasicLayout/LeftMenuCell';
import styles from './style.less';

@connect(state => ({
  global: state.global,
}))
class LeftMenus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leftMenu: this.props.leftMenu,
    };
  }
  getDefaultCollapsedSubMenus= () => {
    this.collapses = [];
    for (const item of this.state.leftMenu) {
      this.collapses.push(
        <div style={{ background: 'none' }}>
          <LeftMenuCell
            menuTitle={item.menuTitle}
            imgUrl={item.imgUrl}
            siderImgWidth={item.siderImgWidth}
          />
        </div>);
    }
    return this.collapses;
  }
  getCollapsedSubMenusTitle= (title, isLink = false) => {
    return (<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
      <div className={styles['left-menu-title']}>
        {isLink ? <a><p>{title}</p></a> : <p>{title}</p>}
      </div></Card>);
  }
  render() {
    return (
      <div style={{ background: '#2d3340' }}>
        {this.getDefaultCollapsedSubMenus()}
      </div>
    );
  }
}

export default LeftMenus;
