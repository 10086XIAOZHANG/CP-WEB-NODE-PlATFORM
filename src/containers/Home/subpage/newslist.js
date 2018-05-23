/* eslint-disable react/jsx-closing-tag-location */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Link } from 'dva/router';
import { Card, Row, Col, Spin } from 'antd';
import styles from './style.less';

class NewsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      currentIndex: 1,
      pageSize: 3,
      isAll: false,
      showdatas: [],
    };
  }
  componentWillMount() {
    const myFetchOptions = {
      method: 'GET',
    };
    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, myFetchOptions).then(response => response.json()).then(json => this.setState({ news: json }));
    this.onPaginationdata();
  }
  onLoadMore=() => {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
    const endNum = (this.state.currentIndex * this.state.pageSize) - 1;
    const startNum = (this.state.currentIndex * this.state.pageSize) - this.state.pageSize;
    if (endNum - startNum < this.state.pageSize ||
      (endNum - startNum === this.state.pageSize &&
      endNum === this.props.count - 1)) {
      this.setState({
        isAll: true,
      });
    }
  }
  onPaginationdata=() => {
    const { news } = this.state;
    const endNum = (this.state.currentIndex * this.state.pageSize) - 1;
    const startNum = (this.state.currentIndex * this.state.pageSize) - this.state.pageSize;
    const newsList = news.length
      ? news.map((newsItem, index) =>
        (index >= startNum && index <= endNum ?
          (<li className={`${styles['new-item']} ${styles.clearfloat}`}>
            <Row>
              <Col xs={2} sm={8} md={12} lg={16} xl={7}>
                <img alt="" src={`${newsItem.thumbnail_pic_s}`} className={styles['new-item-contentleft']} /></Col>
              <Col xs={22} sm={16} md={12} lg={8} xl={17}>
                <div className={styles['new-item-content-right']}>
                  <h2>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                      {newsItem.title}
                    </Link>
                  </h2>
                  <ul className={`${styles['list-inline']} ${styles.meta}`}>
                    <li>{newsItem.author_name} · <span>{newsItem.date}</span></li>
                    <li><i className="icon icon-tag" /> <a href="http://demo.sisome.com/internet/">{newsItem.category}</a>
                    </li>
                  </ul>
                </div></Col>
            </Row>
          </li>) : ''))
      : <Spin size="large" />;
    this.state.showdatas.push(newsList);
    this.setState({
      showdatas: [...this.state.showdatas],
    });
  }
  render() {
    return (
      <div className={styles.topNewsList}>
        <Card>
          <ul style={{ paddingLeft: 0 }}>
            {this.state.showdatas.map(item => item)}
          </ul>
          <div onClick={this.onLoadMore}>{this.state.isAll ? '已经加载到底了,木有数据了' : '点击加载更多……'}</div>
        </Card>
      </div>
    );
  }
}

export default NewsList;
