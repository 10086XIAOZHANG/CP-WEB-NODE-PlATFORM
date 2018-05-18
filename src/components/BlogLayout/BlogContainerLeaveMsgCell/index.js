/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import styles from './style.less';

class BlogContainerLeaveMsgCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      contentsDate: this.props.contentsDate,
    };
  }
  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>上一页</a>;
    } else if (type === 'next') {
      return <a>下一页</a>;
    }
    return originalElement;
  }
  onChange(page, pageSize) {
    const changeState = this.props.onChange;
    changeState(page, pageSize);
  }
  resHandle() {
    const res = this.props.resHandle;
    res();
  }
  render() {
    const msgs = this.state.contentsDate;
    const msgsList = msgs.length
      ? msgs.map((newsItem, index) => (
        <li key={index} className={styles['leave_msgsitem']}>
          <div className={styles.cf}>
            <div className={`${styles.cf} ${styles['avatar_msg']} ${styles.mb10}`}>
              <div className={`${styles.avatar} ${styles.fl} ${styles.mg15}`} style={{ backgroundImage: `url(${newsItem.uimg})` }} />
              <div className={styles.fl}><span className={styles['pd5-r']}>{newsItem.uname}</span><span>2017-10-02</span></div>
              <div className={styles.fr}><a onClick={this.resHandle.bind(this)} /></div>
            </div>
            <p>{newsItem.content}</p>
          </div>
        </li>
      ))
      : '当前暂无评价，小Cp等你来哦';
    return (
      <div className={styles['blogleave_msg_pag']}>
        <div className={styles.bq}>现有共有评价   {this.props.total}   条</div>
        <div className={styles['mes_show']}>
          {msgsList}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Pagination current={this.state.current} total={this.props.total} onChange={this.onChange.bind(this)} itemRender={this.itemRender.bind(this)} />
        </div>
      </div>
    );
  }
}

export default BlogContainerLeaveMsgCell;
