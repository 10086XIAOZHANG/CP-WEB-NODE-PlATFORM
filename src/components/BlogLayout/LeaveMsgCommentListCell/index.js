/**
 *创建时间:  2018/5/19
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card, Input, Button } from 'antd';
import styles from './style.less';

class LeaveMsgCommentListCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles['comment-list']}>
        <p>留言区:</p>
        <Card bordered={false} style={{ width: '100%' }}>
          dfsfs
        </Card>
      </div>
    );
  }
}

export default LeaveMsgCommentListCell;
