/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Tag } from 'antd';
import styles from './style.less';

class BlogContainerAboutsCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles.blogabouts}>
        <h1>标签</h1>
        <Tag color="green"> 90后机宅男程序猿 </Tag>
        <div className={styles['about-content']}>
          <ul>
            <li>昵称：<span className={styles['color-blur']}>浮云小哥</span></li>
            <li>英文名：<span className={styles['color-blur']}>Jimck</span></li>
            <li>职业：<span className={styles['color-blur']}>程序熊</span></li>
          </ul>
        </div>

      </div>
    );
  }
}

export default BlogContainerAboutsCell;
