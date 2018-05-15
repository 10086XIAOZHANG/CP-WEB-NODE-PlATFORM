/* eslint-disable no-useless-constructor,import/no-dynamic-require */
/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Card } from 'antd';
import styles from './style.less';

class LeftMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuTitle: this.props.menuTitle,
      imgUrl: this.props.imgUrl,
    };
  }
  render() {
    return (
      <div>
        <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
          <div className={styles['left-menu-img']}>
            <img style={{ height: this.props.siderImgWidth, width: this.props.siderImgWidth }} alt="example" src={this.state.imgUrl} />
          </div>
          <div className={styles['let-menu-title']}>
            <p>{this.state.menuTitle}</p>
          </div>
        </Card>
      </div>
    );
  }
}

export default LeftMenu;
