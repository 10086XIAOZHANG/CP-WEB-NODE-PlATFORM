/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Store from 'store';
import LeftMenus from '../containers/BasicLayout/LeftMenus';
import Config from '../common/config';
import styles from './BasicLayout.less';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      siderWidth: this.props.siderWidth,
      siderImgWidth: this.props.siderImgWidth,
      collapsed: this.props.collapsed,
    };
  }
  getChildContext() {
    const { location, navData, getRouteData } = this.props;
    const routeData = getRouteData('BasicLayout');
    const firstMenuData = navData.reduce((arr, current) => arr.concat(current.children), []);
    const menuData = this.getMenuData(firstMenuData, '');
    const breadcrumbNameMap = {};

    routeData.concat(menuData).forEach((item) => {
      breadcrumbNameMap[item.path] = item.name;
    });
    return { location, breadcrumbNameMap };
  }
  componentDidMount() {
    // 获取用户信息
    this.props.dispatch({
      type: 'user/fetchCurrent',
      payload: { id: Store.get(Config.USER_ID) },
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      siderWidth: nextProps.siderWidth,
      siderImgWidth: nextProps.siderImgWidth,
      collapsed: nextProps.collapsed,
    });
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
        siderwidth: 200,
        siderimgwidth: 62,
        collapsed: false,
      });
    }
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
    let title = 'React Antd Dva';
    getRouteData('BasicLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - 金蝶K/3 WISE 供应链云平台`;
      }
    });
    return title;
  }
  getDefaultCollapsedSubMenus() {
    return <LeftMenus leftMenu={this.defaultLeftMenu} />;
  }
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const activeLeftMenu = [{
      menuTitle: '订单管理',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '合同管理',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '发货管理',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '发票管理',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '网上业务',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '报表管理',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '库存查询',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    ];
    const defaultLeftMenu = [{
      menuTitle: '销售云',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '采购云',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '仓存云',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '委外云',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    {
      menuTitle: '核算云',
      imgUrl: require('../assets/basiclayout/sale.png'),
      siderImgWidth: this.state.siderImgWidth,
    },
    ];
    const { getRouteData, currentUser } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
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
            <span>金蝶K/3 WISE 供应链云平台</span>
          </div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <div className={styles['header-right']}>
              <div className={styles['user-name']}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                {currentUser.user_name}
              </div>
            </div>
          </Dropdown>
          <Menu
            mode="horizontal"
          >
            <Menu.Item key="empty1">
              <Icon type="empty" />
            </Menu.Item>
            <Menu.Item key="empty2">
              <Icon type="empty" />
            </Menu.Item>
            <Menu.Item key="empty3">
              <Icon type="empty" />
            </Menu.Item>
            <Menu.Item key="mail">
              <Icon type="home" />首页
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={this.state.siderWidth}
            style={{ background: '#fff', marginTop: 135, marginBottom: 20 }}
          >
            {!this.state.collapsed && <LeftMenus leftMenu={defaultLeftMenu} />}
            {this.state.collapsed && <LeftMenus leftMenu={activeLeftMenu} />}
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
            <Footer className={styles['basic-footer']}>
              © 2018 kingdee.  All rights reserved
            </Footer>
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
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
}))(BasicLayout);
