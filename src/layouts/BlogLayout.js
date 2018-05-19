/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Layout, Menu, Icon, Input, Row, Col, Avatar } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Config from '../common/config';
import styles from './BlogLayout.less';

const { Header, Sider, Content } = Layout;

class BlogLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.receiveMarkdown = this.receiveMarkdown.bind(this);
    this.state = {
      collapsed: false,
      shrinked: false,
      lighted: true,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getPageTitle() { // 获取页面标题
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    let title = 'CP 聚合博客';
    getRouteData('BlogLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - CP 聚合博客`;
      }
    });
    return title;
  }
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle=() => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  lightState() {
    this.setState({
      lighted: !this.state.lighted,
    });
  }
  triggerShrink() {
    this.setState({
      shrinked: !this.state.shrinked,
    });
  }
  receiveMarkdown=(content) => {
    console.log('recieved markdown content', content);
  }
  render() {
    const { getRouteData, currentUser } = this.props;
    const layout = (
      <div className={this.state.shrinked ? 'blog_home blog_home_shrinked' : 'blog_home'}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/blog/index">
                  <Icon type="user" />
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/blog/editor">
                  <Icon type="plus" />
                  <span>写博</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/blog/archives">
                  <Icon type="hdd" />
                  <span>归档</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/blog/tags">
                  <Icon type="tag" />
                  <span>标签</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/blog/links">
                  <Icon type="share-alt" />
                  <span>链接</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/blog/leaveMsg">
                  <Icon type="contacts" />
                  <span>留言</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/blog/abouts">
                  <Icon type="paper-clip" />
                  <span>关于</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          {
            this.state.shrinked ? '' :
            <Sider className={`${styles['bg-show']} ${styles['fix-position']}`} style={{ backgroundImage: `url(${Config.defaultProps.resource_server}/blog/${currentUser.username}/myblogbg.jpg)`, height: document.body.clientHeight }}>
              <div className={styles.qg}>
                <Avatar size="large" src={currentUser.avatar} />
                <p>{currentUser.username}</p>
                <p>{currentUser.username}的个人博客</p>
                <span><Icon type="github" /></span>
              </div>
            </Sider>
          }
          <Layout className={this.state.lighted ? 'light' : 'dark'}>
            <Header style={{ padding: 0, backgroundColor: '#fff', width: '100%' }}>
              <div style={{ padding: 3, fontSize: 23 }}>
                <Row type="flex" justify="between-space">
                  <Col span={21}>
                    <Icon
                      className={styles.trigger}
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                    <Icon
                      className={styles.triggerShrink}
                      type={this.state.shrinked ? 'arrows-alt' : 'shrink'}
                      onClick={this.triggerShrink.bind(this)}
                    />
                    <Input.Search
                      placeholder="搜索"
                      style={{ width: 200 }}
                      onSearch={value => console.log(value)}
                    />
                  </Col>
                  <Col span={3}>
                    <Icon
                      type="bulb"
                      onClick={this.lightState.bind(this)}
                    />
                    <Link to="/user">
                      <Icon
                        type="login"
                        className={styles.logout}
                      />
                    </Link>
                  </Col>
                </Row>
              </div>
            </Header>
            <Content style={{ margin: '2px 2px 10px 2px', padding: 24, minHeight: 660, overflowY: 'auto', height: 600 }}>
              <div style={{ minHeight: 'calc(100vh - 260px)' }}>
                <Switch>
                  {
                    getRouteData('BlogLayout').map(item =>
                      (
                        <Route
                          exact={item.exact}
                          key={item.path}
                          path={item.path}
                          component={item.component}
                        />
                      )
                    )
                  }
                  <Redirect exact to="/blog/index" />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={Config.screenConfig.SCREEN_QUERY}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.user.currentUser,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
}))(BlogLayout);
