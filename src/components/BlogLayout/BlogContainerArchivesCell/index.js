/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import moment from 'moment';
import { Link } from 'dva/router';
import { Card, Spin } from 'antd';
import styles from './style.less';

class BlogContainerArchivesCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.solutionsData = [];
    this.solutionData = [];
    this.state = {
      archives: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      archives: nextProps.archives_data.results,
    });
    const result = nextProps.archives_data.results.reduce(this.onAppendCurrent);
    console.log('result', result);
    this.solutionData.push(result);
    this.solutionsData.push({ plusmonth: moment(result.add_time).format('YYYY年MM月'), msg: [...this.solutionData] });
    this.setState({
      archives: [...this.solutionsData],
    });
  }
  onAppendCurrent = (previousValue, currentValue) => {
    if (previousValue && currentValue && previousValue.add_time && currentValue.add_time) {
      const timePrevious = moment(previousValue.add_time).format('YYYY年MM月');
      const timeCurrent = moment(currentValue.add_time).format('YYYY年MM月');
      if (timePrevious === timeCurrent) {
        this.solutionData.push(previousValue);
        return currentValue;
      } else {
        this.solutionsData.push({ plusmonth: timePrevious, msg: [...this.solutionData] });
        this.solutionData.length = 0;
        return currentValue;
      }
    }
  }
  render() {
    const { archives } = this.state;
    const newsList = archives.length
      ? archives.map((newsItem, index) => (
        <li key={index} className={styles.archivesitem}>
          <div>
            <h2 className="mb10">{newsItem.plusmonth}</h2>
            <div>
              <ul className={styles.arcitem}>
                {newsItem.msg.length >= 0
                  ? newsItem.msg.map((msgItem, i) => (
                    <Link className={styles['acticle-archives-link']} to={{ pathname: '/blog/acticle_detail', state: { acticle_id: msgItem.id } }}>
                      <li key={i} >
                        <span style={{ paddingRight: 8 }}>{moment(msgItem.add_time).format('DD')}</span>
                        <a><span>{msgItem.acticle_name}</span></a>
                      </li>
                    </Link>
                  ))
                  : ''
                }
              </ul>
            </div>
          </div>
        </li>
      ))
      : <Spin size="large" />;
    return (
      <div className={styles.archiveslist}>
        <h1>归档</h1>
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  }
}

export default BlogContainerArchivesCell;
