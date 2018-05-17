/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Tabs } from 'antd';
import PCNewsList from './newslist';

class PCBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Tabs class="tabs_news">
          <Tabs.TabPane tab="头条新闻" key="1">
            <PCNewsList key="0f3e0acb886a9980f5e7243361c2f5a0" type="top" width="100%" bordered="false" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="国际" key="2">
            <PCNewsList key="0f3e0acb886a9980f5e7243361c2f5a0" type="guoji" width="100%" bordered="false" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="科技" key="3">
            <PCNewsList key="0f3e0acb886a9980f5e7243361c2f5a0" type="keji" width="100%" bordered="false" />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PCBlock;
