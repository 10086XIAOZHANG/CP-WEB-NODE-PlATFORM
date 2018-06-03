/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/6/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Link } from 'dva/router';
import { Card, Spin } from 'antd';
import styles from './style.less';

class PCNewsBlock extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      news: '',
    };
  }
  componentWillMount() {
    const myFetchOptions = {
      method: 'GET',
    };
    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, myFetchOptions).then(response => response.json()).then(json => this.setState({ news: json }));
  }
  render() {
    const { news } = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <li key={index}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            {newsItem.title}
          </Link>
        </li>
      ))
      : <Spin size="large" />;
    return (
      <div className={styles.topNewsList}>
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  }
}

export default PCNewsBlock;
