/**
 *创建时间:  2018/5/17
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import { store } from '../common/local.storage';
import Config from '../common/config';
import styles from './BasicLayout.less';
import FooterCell from '../components/BasicLayout/Footer';
import PCHeader from '../containers/Home/subpage/header';

const { SubMenu } = Menu;
const { Header, Content } = Layout;

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.activeKey = '';
    this.state = {
    };
  }
  componentDidMount() {
    // 获取用户信息
    if (store.get(Config.defaultProps.USER_ID)) {
      console.log('进入fetchCurerntnt1');
      this.props.dispatch({
        type: 'user/fetchCurrent',
      });
    } else {
      this.props.dispatch(routerRedux.push('/main/login'));
    }
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
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
          />
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
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const { getRouteData, currentUser } = this.props;
    const layout = (
      <Layout className={styles['basic-layout']}>
        <Header className={styles['basic-header']}><PCHeader currentUser={currentUser} /></Header>
        <Content style={{ marginTop: 56 }} className={styles['basic-content']}>
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
              <Redirect exact from="/" to="/main/Home" />
            </Switch>
          </div>
          <FooterCell />
        </Content>
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
  user: state.user,
  currentUser: state.user.currentUser,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
}))(BasicLayout);
