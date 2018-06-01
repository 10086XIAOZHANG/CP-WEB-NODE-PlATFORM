/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card } from 'antd';
import styles from './style.less';

class BlogContainerArchivesCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      archives: [{
        plusmonth: '2017-6',
        msg: [{
          plusday: '05',
          title: '不使用插件实现文章浏览数统计',
          url: '',
        }],
      },
      {
        plusmonth: '2017-7',
        msg: [{
          plusday: '14',
          title: '不使用插件实现文章浏览数统计',
          url: '',
        },
        {
          plusday: '15',
          title: '不使用插件实现文章浏览数统计',
          url: '',
        }],
      },
      {
        plusmonth: '2017-8',
        msg: [{
          plusday: '31',
          title: '不使用插件实现文章浏览数统计',
          url: '',
        }],
      },
      ],
    };
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
                    <li key={i} >
                      <span style={{ paddingRight: 8 }}>{msgItem.plusday}</span>
                      <a><span>{msgItem.title}</span></a>
                    </li>
                  ))
                  : ''
                }
              </ul>
            </div>
          </div>
        </li>
      ))
      : '您的沙发为空，快快去书写我的博';
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
