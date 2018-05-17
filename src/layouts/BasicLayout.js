/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar, Tabs, Input } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Store from 'store';
import SubLeftMenus from '../containers/BasicLayout/SubLeftMenus';
import Config from '../common/config';
import styles from './BasicLayout.less';
import FooterCell from '../components/BasicLayout/Footer';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.activeKey = '';
    this.state = {
      siderWidth: this.props.siderWidth,
      siderImgWidth: this.props.siderImgWidth,
      collapsed: this.props.collapsed,
      menus: this.props.menus,
      activeKey: this.props.tabActiveKey,
      panes: this.props.menuList,
      searchText: '',
    };
    this.operations = (<Input.Search
      placeholder=" "
      onChange={(value) => { this.changeSearchEvent(value); }}
      searchText={this.state.searchText}
      className={styles['header-input-search']}
    />);
  }
  componentDidMount() {
    // 获取用户信息
    this.props.dispatch({
      type: 'user/fetchCurrent',
      payload: { id: Store.get(Config.defaultProps.USER_ID) },
    });
  }
  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location;
    this.setState({
      siderWidth: nextProps.siderWidth,
      siderImgWidth: nextProps.siderImgWidth,
      collapsed: nextProps.collapsed,
      menus: nextProps.menu,
      activeKey: nextProps.tabActiveKey,
    });
    if (!locationChanged) {
      this.setState({
        panes: nextProps.menuList,
      });
    }
    console.log('进入componentWillReceiveProps');
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
      this.props.dispatch({
        type: 'global/changeLayoutSiderState',
        siderwidth: 100,
        siderimgwidth: 25,
        collapsed: false,
      });
    }
  }
  onTabItemClick=(tabItemKey) => {
    const { history } = this.props;
    this.setState({ activeKey: tabItemKey, collapsed: !this.state.collapsed });
    history.replace(tabItemKey, this.state);
    this.props.dispatch({
      type: 'global/changeLayoutSiderState',
      siderwidth: 100,
      siderimgwidth: 25,
      collapsed: false,
      menuList: this.state.panes,
    });
    this.props.dispatch({
      type: 'global/changetabActiveKey',
      payload: tabItemKey,
    });
  }
  onTabChange = (activeKey) => {
    this.setState({ activeKey });
  }
  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach((item) => {
      if (item.children) {
        arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
        arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
      }
    });
    return arr;
  }
  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.key || item.path} className={styles['basic-menu-item']}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}<span>{item.name}</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                target={item.target}
                replace={itemPath === this.props.location.pathname}
              >
                {icon}<span>{item.name}</span>
              </Link>
            )
          }
        </Menu.Item>
      );
    });
  }
  getPageTitle() { // 获取页面标题
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    let title = 'CP 聚合博客';
    getRouteData('BasicLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - CP 聚合博客`;
      }
    });
    return title;
  }
  removeTab = (targetKey) => {
    const { history } = this.props;
    // const { pathname } = location;
    this.activeKey = this.state.activeKey;
    let lastIndex = -1;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && this.activeKey === targetKey) {
      this.activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey: this.activeKey, collapsed: !this.state.collapsed });
    history.replace('/dashboard/KdMainControl', this.state);
    this.props.dispatch({
      type: 'global/changeLayoutSiderState',
      siderwidth: 100,
      siderimgwidth: 25,
      collapsed: false,
      menuList: this.state.panes,
    });
  }
  changeSearchEvent = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const { getRouteData, currentUser } = this.props;
    const menu = (
      <Menu theme="dark" className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled key="user"><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled key="setting"><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    const layout = (
      <Layout className={styles['basic-layout']}>
        <Header className={styles['basic-header']}>
          <div className={styles['header-home']} />
          <div className={styles['header-home-link']}>
            <img alt="" src={require('../assets/bases/logo.png')} /><span className={styles['header-home-title']}>K/3 WISE 供应链云平台</span>
          </div>
          <div className={styles['header-right']}><span className={styles['platform-help']}><span className={styles['split-line']}>|</span>帮助</span></div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <div className={styles['header-right']}>
              <div className={styles['user-inf']}>
                <Avatar size="large" className={styles.avatar} src={currentUser.avatar} />
                {currentUser.name}
              </div>
            </div>
          </Dropdown>
          <div className={styles['header-right']}><span className={styles['user-org']}>{currentUser.org}<span className={styles['split-line']}>|</span></span></div>
          <Tabs
            hideAdd
            onChange={this.onTabChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            defaultActiveKey="/dashboard/KdMainControl"
            onEdit={this.removeTab}
            onTabClick={this.onTabItemClick}
            tabPosition="bottom"
            className={styles['tab-content']}
            tabBarExtraContent={this.operations}
          >
            {this.state.panes.map(pane => (
              <Tabs.TabPane
                tab={pane.menuTitle}
                key={pane.key}
                closable={pane.closable}
              />))}
          </Tabs>
        </Header>
        <Layout>
          <Sider
            width={this.state.siderWidth}
            style={{ background: '#333', marginTop: 135, marginBottom: 20 }}
          >
            <SubLeftMenus
              siderImgWidth={this.state.siderImgWidth}
              collapsed={this.state.collapsed}
              menus={this.state.menus}
            />
          </Sider>
          <Content style={{ marginTop: 135 }} className={styles['basic-content']}>
            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
              <Switch>
                {
                  getRouteData('BasicLayout').map(item =>
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
                <Redirect exact from="/" to="/dashboard/KdMainControl" />
              </Switch>
            </div>
            <FooterCell />
          </Content>
        </Layout>
      </Layout>
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
  siderWidth: state.global.siderWidth,
  siderImgWidth: state.global.siderImgWidth,
  currentUser: state.user.currentUser,
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
  menuList: state.global.menuList,
  tabActiveKey: state.global.tabActiveKey,
  menu: state.menu,
}))(BasicLayout);
