/* eslint-disable react/no-array-index-key,jsx-a11y/anchor-has-content,jsx-a11y/accessible-emoji */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Pagination, Card, Avatar, Tag } from 'antd';
import { Link } from 'dva/router';
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
    this.setState({
      current: page,
    });
    const changeState = this.props.onChange;
    changeState(page, pageSize);
  }
  getItemRender=(current, type, originalElement) => {
    console.log(current);
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
    const endIndex = (this.state.current * this.props.pageSize) - 1;
    const startIndex = (this.state.current * this.props.pageSize) - this.props.pageSize;
    console.log(endIndex, startIndex);
    const msgsList = msgs.length > 0
      ? msgs.map((newsItem, index) => (
        (index <= endIndex && index >= startIndex) ? (
          <li key={index} className={styles['leave-msgsitem']}>
            <Card style={{ width: '100%' }}>
              <div className={styles.cf}>
                <div className={`${styles.cf} ${styles['avatar-msg']} ${styles.mb10}`}>
                  <div className={`${styles.avatar} ${styles.fl} ${styles.mg15}`}><Avatar size="large" src={newsItem.uimg} /></div>
                  <div className={styles.fl}><span className={styles['pd5-r']}>{newsItem.uname}</span><span>{newsItem.public_date}</span></div>
                  <div className={styles.fr}><a onClick={this.resHandle} /></div>
                </div>
                <p>{newsItem.content}</p>
                <div style={{ float: 'right' }}><div style={{ display: 'inline' }}><Tag color="magenta">点赞👍 {newsItem.approval_num}</Tag></div><div style={{ display: 'inline' }}><Link to="jb">举报</Link></div></div>
              </div>
            </Card>
          </li>) : ''
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
            pageSize={this.props.pageSize}
            itemRender={this.getItemRender}
          />
        </div>
      </div>
    );
  }
}

export default BlogContainerLeaveMsgCell;
