/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Link } from 'dva/router';
import { Card } from 'antd';

class NewsList extends React.PureComponent {
  constructor(props) {
    super(props);
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
      ? news.map((newsItem, index) => {
        <li key={index} className="newitem">
          <img alt="" src={`${newsItem.thumbnail_pic_s}`} className="contentleft"/>
          <div className="contentleft contentnew">
            <h2>
              <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                {newsItem.title}
              </Link>
            </h2>
            <div>
              <ul className="list-inline meta">
                <li>{newsItem.author_name} · <span>{newsItem.date}</span></li>
                <li><i className="icon icon-tag"/> <a href="http://demo.sisome.com/internet/">{newsItem.category}</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      })
      : '没有加载到任何新闻';
    return (
      <div className="topNewsList">
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  }
}

export default NewsList;
