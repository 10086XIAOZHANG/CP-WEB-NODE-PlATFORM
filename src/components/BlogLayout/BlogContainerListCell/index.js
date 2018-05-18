/* eslint-disable react/no-array-index-key */
/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Button, Icon, Card } from 'antd';
import styles from './style.less';

class BlogContainerListCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [{
        uname: '坚持到底',
        uimg: '../../static/avatar/j.jpg',
        title: '不使用插件实现文章浏览数统计',
        content: '在Typecho主题的functions.php 文件中,提供了三个系统方法：themeConfig 用于配置主题themeInit 在初始化皮肤函数时调用themeFields 后台编辑文章时，为主题增加一个自动绑定的输入框(最新开发版添',
        classType: '.NET',
        scanNum: 12,
        colNum: 4,
        msgNum: 3,
      },
      {
        uname: '隔壁的老王',
        uimg: '../../static/avatar/j.jpg',
        title: '不使用插件实现文章浏览数统计',
        content: '在Typecho主题的functions.php 文件中,提供了三个系统方法：themeConfig 用于配置主题themeInit 在初始化皮肤函数时调用themeFields 后台编辑文章时，为主题增加一个自动绑定的输入框(最新开发版添',
        classType: '.NET',
        scanNum: 12,
        colNum: 4,
        msgNum: 3,
      },
      {
        uname: '老曾头',
        uimg: '../../static/avatar/j.jpg',
        title: '不使用插件实现文章浏览数统计',
        content: '在Typecho主题的functions.php 文件中,提供了三个系统方法：themeConfig 用于配置主题themeInit 在初始化皮肤函数时调用themeFields 后台编辑文章时，为主题增加一个自动绑定的输入框(最新开发版添',
        classType: '.NET',
        scanNum: 12,
        colNum: 4,
        msgNum: 3,
      },
      ],
    };
  }
  render() {
    const { blogs } = this.state;
    const newsList = blogs.length
      ? blogs.map((newsItem, index) => (
        <li key={index} className={styles.blogsitem}>
          <div className={styles.cf}>
            <div className={`${styles.cf} ${styles['avatar-msg']} ${styles.mb10}`}>
              <div className={`${styles.avatar} ${styles.fl} ${styles.mg15}`} style={{ backgroundImage: `url(${newsItem.uimg})` }} />
              <div className={styles.fl}>
                <span className={styles['pd5-r']}>{newsItem.uname}
                </span><span>2017-10-02</span>
              </div>
            </div>
            <h2 className={styles.mb10}>{newsItem.title}</h2>
            <p>{newsItem.content}</p>
            <div>
              <ul className="list-inline meta">
                <li> <Button type="danger" size="small" ghost>{newsItem.classType}</Button> · <span><Icon type="eye-o" />{newsItem.scanNum}</span></li>
                <li><span style={{ paddingRight: 5 }}><Icon type="message" />{newsItem.msgNum}</span>    <span><Icon type="heart" />{newsItem.colNum}</span></li>
              </ul>
            </div>
          </div>
        </li>
      ))
      : '您的沙发为空，快快去书写我的博';
    return (
      <div className={styles.bloglist}>
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  }
}

export default BlogContainerListCell;
