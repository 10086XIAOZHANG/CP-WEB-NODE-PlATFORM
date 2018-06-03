/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/6/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Card, Spin } from 'antd';
import { Link } from 'dva/router';
import styles from './style.less';

class PCNewsImageBlock extends React.PureComponent {
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
    const styleImage = {
      display: 'block',
      width: this.props.imageWidth,
      height: '90px',
    };
    const styeH3 = {
      width: this.props.imageWidth,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
    const { news } = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <div key={index} className={styles.imageblock}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            <div className={styles['custom-image']}>
              <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
            </div>
            <div className={styles['custom-card']}>
              <h3 style={styeH3}>{newsItem.title}</h3>
              <p>{newsItem.author_name}</p>
            </div>
          </Link>
        </div>
      ))
      : <Spin size="large" />;
    return (
      <div className={styles.topNewsList}>
        <Card
          title={this.props.cartTitle}
          bordered
          style={{
          width: this.props.width,
        }}
        >
          {newsList}
        </Card>
      </div>
    );
  }
}

export default PCNewsImageBlock;
