/**
 *创建时间:  2018/5/19
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card, Input, Button } from 'antd';
import styles from './style.less';

class LeaveMsgCommentEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles['comment-editor']}>
        <Card bordered={false} style={{ width: '100%' }}>
          <p>我要留言</p>
          <Input.TextArea rows={4} />
          <div className={styles['comment-editor-btn']}>
            <Button style={{ float: 'right' }} type="danger">发表留言</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default LeaveMsgCommentEditorCell;
