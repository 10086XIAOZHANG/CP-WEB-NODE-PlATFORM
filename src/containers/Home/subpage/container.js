/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Row, Col, Icon, BackTop, Tabs, Card, Tag } from 'antd';
import PCNewsList from './newslist';

class PCNewsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Row style={{ marginTop: 20 }}>
          <Col span={2} />
          <Col span={13}>
            <Tabs className="tabs_news">
              <Tabs.TabPane tab="头条新闻" key="1">
                <PCNewsList count="22" type="top" width="100%" bordered="false" />
              </Tabs.TabPane>
              <Tabs.TabPane tab="国际" key="2">
                <PCNewsList count="22" type="guoji" width="100%" bordered="false" />
              </Tabs.TabPane>
              <Tabs.TabPane tab="科技" key="3">
                <PCNewsList count="22" type="keji" width="100%" bordered="false" />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={6}>
            <Card extra={<Icon type="schedule" />} title="站点推荐" className="recommend">
              <div className="recommend-image">
                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
              </div>
            </Card>
            <Card extra={<Icon type="schedule" />} title="热门文章" className="hot">
              <div className="recommend-image">
                <PCNewsList count="4" type="keji" width="100%" bordered="false" />
              </div>
            </Card>
            <Card title="标签" noHovering className="tags">
              <div className="tags_content">
                <Tag color="orange" style={{ fontSize: 11 }}>主题(2)</Tag>
                <Tag color="orange" style={{ fontSize: 17 }}>周杰伦</Tag>
                <Tag color="green" style={{ fontSize: 31 }}>alibaba(3)</Tag>
                <Tag color="#ffeedd" style={{ fontSize: 12 }}>Cloud</Tag>
                <br />
                <Tag color="cyan">邓紫琪</Tag><Tag color="pink">谷歌(2)</Tag>
                <Tag color="purple">刘强东</Tag>
                <Tag color="#c3f2ce">html</Tag>
                <Tag color="#c212ce">大数据</Tag>

              </div>
            </Card>
          </Col>
        </Row>
        <BackTop className="backtop">
          <div className="ant-back-top-inner"><Icon type="to-top" style={{ size: 32, fontSize: 24 }} />回到顶部</div>
        </BackTop>
      </div>
    );
  }
}

export default PCNewsContainer;
