/* eslint-disable react/no-array-index-key,jsx-a11y/anchor-has-content */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Pagination, Card } from 'antd';
import styles from './style.less';

class BlogContainerLeaveMsgCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      contentsDate: this.props.contentsDate,
    };
  }
  onChange=(page, pageSize) => {
    const changeState = this.props.onChange;
    changeState(page, pageSize);
  }
  getItemRender=(current, type, originalElement) => {
    if (type === 'prev') {
      return <a>上一页</a>;
    } else if (type === 'next') {
      return <a>下一页</a>;
    }
    return originalElement;
  }
  resHandle=() => {
    const res = this.props.resHandle;
    res();
  }
  render() {
    const msgs = this.state.contentsDate;
    const msgsList = msgs.length
      ? msgs.map((newsItem, index) => (
        <li key={index} className={styles['leave-msgsitem']}>
          <Card bordered={false} style={{ width: '100%' }}>
            <div className={styles.cf}>
              <div className={`${styles.cf} ${styles['avatar-msg']} ${styles.mb10}`}>
                <div className={`${styles.avatar} ${styles.fl} ${styles.mg15}`} style={{ backgroundImage: `url(${newsItem.uimg})` }} />
                <div className={styles.fl}><span className={styles['pd5-r']}>{newsItem.uname}</span><span>2017-10-02</span></div>
                <div className={styles.fr}><a onClick={this.resHandle} /></div>
              </div>
              <p>{newsItem.content}</p>
            </div>
          </Card>
        </li>
      ))
      : '当前暂无评价，小Cp等你来哦';
    return (
      <div className={styles['blogleave-msg-pag']}>
        <div className={styles.bq}>现有共有评价   {this.props.total}   条</div>
        <div className={styles['mes-show']}>
          {msgsList}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Pagination
            current={this.state.current}
            total={this.props.total}
            onChange={this.onChange}
            itemRender={this.getItemRender}
          />
        </div>
      </div>
    );
  }
}

export default BlogContainerLeaveMsgCell;
