/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card, Tag } from 'antd';
import styles from './style.less';

class BlogContainerTagsCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles.blogtags}>
        <h1>标签</h1>
        <Card title="" noHovering className={styles.tags}>
          <div className={styles['tags-content']}>
            <Tag color="orange" style={{ fontSize: 11 }}>主题</Tag>
            <Tag color="orange" style={{ fontSize: 17 }}>周杰伦</Tag>
            <Tag color="green" style={{ fontSize: 21 }}>alibaba</Tag>
            <Tag color="#ffeedd" style={{ fontSize: 11 }}>Cloud</Tag>
            <br />
            <Tag color="cyan">邓紫琪</Tag><Tag color="pink">谷歌</Tag>
            <Tag color="purple">刘强东</Tag>
            <Tag color="#c3f2ce">html</Tag>
            <Tag color="#c212ce">大数据</Tag>

          </div>
        </Card>
      </div>
    );
  }
}

export default BlogContainerTagsCell;
