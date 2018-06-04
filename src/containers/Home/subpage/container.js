/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Row, Col, Icon, BackTop, Tabs, Carousel } from 'antd';
import PCNewsImageBlock from '../../../components/BasicLayout/PCNewsImageBlock';
import PCNewsBlock from '../../../components/BasicLayout/PCNewsBlock';
import PCProduct from '../../../components/BasicLayout/PCProduct';
import styles from './style.less';

const { TabPane } = Tabs;

class PCNewsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
    };
    return (
      <div style={{ marginTop: 10 }}>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <div style={{ clear: 'both' }} />
            <div style={{ width: 400, float: 'left', backgroundColor: '#fff' }}>
              <Carousel {...settings} style={{ float: 'left' }}>
                <div><img alt="" src={require('../../../assets/home/carousel_1.jpg')} /></div>
                <div><img alt="" src={require('../../../assets/home/carousel_2.jpg')} /></div>
                <div><img alt="" src={require('../../../assets/home/carousel_3.jpg')} /></div>
                <div><img alt="" src={require('../../../assets/home/carousel_4.jpg')} /></div>
              </Carousel>
              <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="100px" />
            </div>
            <div style={{ float: 'left', width: 450, backgroundColor: '#fff', marginLeft: 10 }}>
              <Tabs>
                <TabPane tab="头条新闻" key="1">
                  <PCNewsBlock count={22} type="top" width="100%" bordered="false" />
                </TabPane>
                <TabPane tab="国际" key="2">
                  <PCNewsBlock count={22} type="guoji" width="100%" bordered="false" />
                </TabPane>
              </Tabs>
            </div>
            <div style={{ backgroundColor: '#fff', marginLeft: 'auto', marginRight: 'auto' }}>
              <Tabs style={{ paddingLeft: 10 }}>
                <TabPane tab="ReactNews 产品" key="1">
                  <PCProduct />
                </TabPane>
              </Tabs>
            </div>
            <div style={{ clear: 'both' }} />
            <div>
              <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="122px" />
              <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="122px" />
            </div>
          </Col>
          <Col span={2} />
        </Row>
        <BackTop className={styles.backtop}>
          <div className={styles['ant-back-top-inner']}><Icon type="to-top" style={{ size: 32, fontSize: 24 }} />回到顶部</div>
        </BackTop>
      </div>
    );
  }
}

export default PCNewsContainer;
