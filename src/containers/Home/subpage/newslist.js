/* eslint-disable react/jsx-closing-tag-location,array-callback-return */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import styles from './style.less';

@connect(state => ({
  home_news: state.home_news,
}))
class NewsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
      pageSize: 4,
      startNum: 0,
      endNum: 0,
      isAll: false,
      news: null,
      showdatas: [],
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'home_news/getNews',
      typeProps: this.props.type,
      count: this.props.count,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.home_news.status === 'ok') {
      this.onPaginationdata(nextProps.home_news.news.slice(2));
      this.setState({
        news: nextProps.home_news.news,
      });
    }
  }
  onLoadMore=() => {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
    setTimeout(() => {
      console.log('打印endNUm', this.state.endNum);
      if (this.state.endNum - this.state.startNum < this.state.pageSize ||
        this.state.endNum >= this.props.count - 1) {
        this.setState({
          isAll: true,
        });
      } else {
        this.onPaginationdata(this.state.news);
      }
    }, 0);
  }
  onPaginationdata=(json) => {
    const news = json;
    const endNumPage = (this.state.currentIndex * this.state.pageSize);
    const startNumPage = (this.state.currentIndex * this.state.pageSize) - this.state.pageSize;
    this.setState({
      startNum: startNumPage,
      endNum: endNumPage,
      news: json,
    });
    const subNews = news.slice(startNumPage, endNumPage);
    const newsList = subNews.map((newsItem) => {
      return (<li className={`${styles['new-item']} ${styles.clearfloat}`}>
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
                <li><i className="icon icon-tag" /> <a
                  href="http://demo.sisome.com/internet/"
                >{newsItem.category}</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </li>);
    });
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
          <div className={styles['load-more-news']} onClick={this.onLoadMore}>{this.state.isAll ? '已经加载到底了,木有数据了' : '点击加载更多……'}</div>
        </Card>
      </div>
    );
  }
}

export default NewsList;
