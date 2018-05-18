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
import BlogContainerList from '../containers/BlogContainerList';

const { Header, Sider, Content } = Layout;

class BlogLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.receiveMarkdown = this.receiveMarkdown.bind(this);
    this.state = {
      collapsed: false,
      shrinked: false,
      lighted: true,
      blogPageState: 0,
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
  toggle() {
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
  changeblogPageState(stateId) {
    console.log('进入点击事件');
    this.setState({
      blogPageState: stateId,
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
                <a onClick={() => this.changeblogPageState(0)}>
                  <Icon type="user" />
                  <span>首页</span>
                </a>
              </Menu.Item>
              <Menu.Item key="2">
                <a onClick={() => this.changeblogPageState(1)}>
                  <Icon type="plus" />
                  <span>写博</span>
                </a>
              </Menu.Item>
              <Menu.Item key="3">
                <a onClick={() => this.changeblogPageState(2)}>
                  <Icon type="hdd" />
                  <span>归档</span>
                </a>
              </Menu.Item>
              <Menu.Item key="4">
                <a onClick={() => this.changeblogPageState(3)}>
                  <Icon type="tag" />
                  <span>标签</span>
                </a>
              </Menu.Item>
              <Menu.Item key="5">
                <a onClick={() => this.changeblogPageState(4)}>
                  <Icon type="share-alt" />
                  <span>链接</span>
                </a>
              </Menu.Item>
              <Menu.Item key="6">
                <a onClick={() => this.changeblogPageState(5)}>
                  <Icon type="contacts" />
                  <span>留言</span>
                </a>
              </Menu.Item>
              <Menu.Item key="7">
                <a onClick={() => this.changeblogPageState(6)}>
                  <Icon type="paper-clip" />
                  <span>关于</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
          {
            this.state.shrinked ? '' :
            <Sider className="bg_show fix_position">
              <div className="qg">
                <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <p>浮云小哥</p>
                <p>浮云小哥的个人博客</p>
                <span><Icon type="github" /></span>
              </div>
            </Sider>
          }
          <Layout className={this.state.lighted ? 'light' : 'dark'}>
            <Header style={{ padding: 0 }}>
              <div style={{ padding: 3, fontSize: 23 }}>
                <Row>
                  <Col span={20}>
                    <Menu
                      theme={this.state.lighted ? '' : 'dark'}
                      mode="horizontal"
                      defaultSelectedKeys={['2']}
                      style={{ lineHeight: '64px' }}
                    >
                      <Menu.Item key="1" >
                        <Icon
                          className="trigger"
                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.toggle.bind(this)}
                        />
                      </Menu.Item>
                      {/* <Icon type="shrink" /> */}
                      <Menu.Item key="2">
                        <Icon
                          className="triggerShrink"
                          type={this.state.shrinked ? 'arrows-alt' : 'shrink'}
                          onClick={this.triggerShrink.bind(this)}
                        />
                      </Menu.Item>
                      <Menu.Item key="3">
                        <Input.Search
                          placeholder="搜索"
                          style={{ width: 200 }}
                          onSearch={value => console.log(value)}
                        />
                      </Menu.Item>
                    </Menu>
                  </Col>
                  <Col>
                    <Menu
                      theme={this.state.lighted ? '' : 'dark'}
                      mode="horizontal"
                      defaultSelectedKeys={['2']}
                      style={{ lineHeight: '64px' }}
                    >
                      <Menu.Item key="1" >
                        <Icon
                          type="bulb"
                          onClick={this.lightState.bind(this)}
                        />
                      </Menu.Item>
                      <Menu.Item key="2" >
                        <Link to="/login">
                          <Icon
                            type="login"
                            className=""
                          />
                        </Link>
                      </Menu.Item>
                    </Menu>
                  </Col>
                </Row>
              </div>
            </Header>
            <Content style={{ margin: '5px 0px', padding: 24, minHeight: 660 }}>
              {
                this.state.blogPageState === 0 ?
                  <BlogContainerList />
                  :
                  (this.state.blogPageState === 1 ?
                    <BlogEditor />
                      : (this.state.blogPageState === 2 ?
                        <BlogArchive />
                          : (this.state.blogPageState === 3 ?
                            <BlogTag />
                            : (this.state.blogPageState === 4 ?
                              <BlogLink /> : (this.state.blogPageState === 5 ?
                                <BlogLeaveMsg /> : (this.state.blogPageState === 6 ?
                                  <PcBlogAbout /> : ''))))
                      )
                  )
              }
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
