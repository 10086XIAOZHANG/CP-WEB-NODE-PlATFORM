/**
 *创建时间:  2018/4/10
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Card } from 'antd';
import styles from './style.less';

class OrderManageCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.imgUrl,
      title: this.props.title,
    };
  }
  render() {
    return (
      <div>
        <Card style={{ width: 124, background: 'none' }} bodyStyle={{ padding: 10 }}>
          <a onClick={this.props.enterWorkspace}>
            <div className={styles['order-image']}>
              <img alt="example" width="100%" src={this.state.imgUrl} />
            </div>
            <div className={styles['order-title']}>
              <p>{this.state.title}</p>
            </div>
          </a>
        </Card>
      </div>
    );
  }
}

export default OrderManageCard;
