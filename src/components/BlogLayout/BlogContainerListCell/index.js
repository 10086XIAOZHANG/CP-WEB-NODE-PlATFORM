/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Card, Pagination, Avatar, Spin } from 'antd';
import styles from './style.less';

class BlogContainerListCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      blogs: this.props.acticle_data && this.props.acticle_data.results ?
        this.props.acticle_data.results : [],
      total: this.props.acticle_data.count,
      current: 1,
      // next: this.props.acticle_data.next,
      // previous: this.props.acticle_data.previous,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      blogs: nextProps.acticle_data.results,
      total: nextProps.acticle_data.count,
      // next: nextProps.next,
      // previous: nextProps.previous,
    });
    console.log('nextProps.acticle_data.count', nextProps.acticle_data.count);
  }
  onChange=(page, pageSize) => {
    this.setState({
      current: page,
    });
    this.props.changeState(page, pageSize);
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
  render() {
    const { blogs } = this.state;
    const newsList = blogs && blogs.length
      ? blogs.map((newsItem, index) => (
        <li key={index} className={styles.blogsitem}>
          <div className={styles.cf}>
            <div className={`${styles.cf} ${styles['avatar-msg']} ${styles.mb10}`}>
              <div className={`${styles.avatar} ${styles.fl} ${styles.mg15}`} >
                <Avatar size="large" src={this.props.avatar || require('../../../assets/login/avatar/default_avatar.jpg')} />
              </div>
              <div className={styles.fl}>
                <span className={styles['pd5-r']}>{newsItem.uname}
                </span><span>{newsItem.add_time}</span>
              </div>
            </div>
            <Link className={styles['acticle-detail-link']} to={{ pathname: '/blog/acticle_detail', state: { acticle_id: newsItem.id } }}><h3 className={styles.mb10}>{newsItem.acticle_name}</h3></Link>
            <div dangerouslySetInnerHTML={{ __html: newsItem.acticle_content.substr(0, 100) }} />
            <div>
              <ul className={styles['list-inline']}>
                <li> <Button type="danger" size="small" ghost>{newsItem.acticle_sn}</Button> · <span><Icon type="eye-o" />{newsItem.click_num}</span></li>
                <li><span style={{ paddingRight: 5 }}><Icon type="message" />{newsItem.comment_num}</span>    <span><Icon type="heart" />{newsItem.fav_num}</span></li>
              </ul>
            </div>
          </div>
        </li>
      ))
      : <Spin size="large" />;
    return (
      <div className={styles.bloglist}>
        <Card>
          <ul>
            {newsList}
          </ul>
          <div style={{ textAlign: 'center' }}>
            <Pagination
              current={this.state.current}
              defaultCurrent={1}
              total={this.state.total}
              onChange={this.onChange}
              pageSize={2}
              itemRender={this.getItemRender}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default BlogContainerListCell;
