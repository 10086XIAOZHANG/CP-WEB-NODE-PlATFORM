/**
 *创建时间:  2018/6/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import { Row, Col, Spin } from 'antd';
import React from 'react';
import { withRouter } from 'dva/router';
import PCNewsImageBlock from '../../components/BasicLayout/PCNewsImageBlock';

class NewsDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      newsItem: '',
    };
  }
  componentDidMount() {
    const myFetchOptions = {
      method: 'GET',
    };
    console.log('new-detail', this.props.history.location.state.uniquekey);
    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.history.location.state.news_uniquekey}`, myFetchOptions).then(response => response.json()).then((json) => {
      this.setState({ newsItem: json });
      document.title = `${this.state.newsItem.title} - 新闻 | CP聚合博客`;
    });
  }
  createMarkup() {
    return { __html: this.state.newsItem.pagecontent };
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <Row>
          <Col span={2} />
          <Col span={14}>
            {this.state.newsItem ? <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()} /> : <Spin size="large" />}
          </Col>
          <Col span={6}>
            <div style={{ marginLeft: 10 }}>
              <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="120px" />
            </div>
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default withRouter(NewsDetail);
