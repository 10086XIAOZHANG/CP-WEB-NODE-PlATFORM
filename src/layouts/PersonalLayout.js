/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Tabs, Avatar, Layout } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { Switch, Redirect, Route, Link } from 'dva/router';
// import Cookies from 'js-cookie';
import Debounce from 'lodash-decorators/debounce';
import { store } from '../common/local.storage';
import FooterCell from '../components/BasicLayout/Footer';
import PCHeader from '../containers/Home/subpage/header';
import Config from '../common/config';
import styles from './PersonalLayout.less';

const { Header, Content } = Layout;
const { TabPane } = Tabs;
@connect(state => ({
  personal_centered: state.personal_centered,
}))
class PersonalLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // 获取用户信息
    // if (store.get(Config.defaultProps.USER_ID) || Cookies.get('id')) {
    //   console.log('进入fetchCurerntnt1');
    //   if (Cookies.get('token')) {
    //     store.set(Config.defaultProps.USER_TOKEN, Cookies.get('token'));
    //   }
    //   this.props.dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // } else {
    //   this.props.dispatch(routerRedux.push('/main/login'));
    // }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.personal_centered.partial_user_status === 'ok') {
      this.props.dispatch({
        type: 'global/changeSuccessMessage',
        payload: '修改成功',
      });
      this.props.dispatch({
        type: 'personal_centered/changePartialStatus',
        status: 'error',
      });
    }
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  onUserInfoSubmit=() => {
    console.log('这是个人修改信息1');
    this.props.form.validateFields({ force: true },
      (err, values) => {
        const newVal = values;
        newVal.birthday = moment(values.birthday).format('YYYY-MM-DD');
        console.log('这是个人修改信息', newVal);
        if (!err) {
          this.props.dispatch({
            type: 'personal_centered/changePartialUserInfo',
            params: newVal,
          });
        }
      }
    );
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
    const { getRouteData } = this.props;
    const userinfo = store.get(Config.defaultProps.USER_INFO);
    const layout = (
      <Layout className={styles['basic-layout']}>
        <Header className={styles['basic-header']}><PCHeader currentUser={store.get(Config.defaultProps.USER_INFO)} status="ok" /></Header>
        <Content style={{ marginTop: 56 }} className={styles['basic-content']}>
          <div className={styles['personer-center-container']}>
            <div style={{ float: 'left' }}>
              <div className={styles['user-navigate']}>
                <div style={{ display: 'inline-block' }}>
                  <Avatar size="large" src={userinfo.avatar} />
                  <div className={styles['user-name']}><a href="/main/personerCenter">{userinfo.name}</a></div>
                </div>
              </div>
              <Tabs tabPosition="left" size="large" className={styles['personal-menu']} style={{ textAlign: 'center' }} tabBarStyle={{ width: 200, textAlign: 'center', backgroundColor: 'f9f9f9' }}>
                <TabPane tab={<Link to="/personal/userinfo"><div className={styles['tab-name']}>我的信息</div></Link>} key="1" />
                <TabPane tab={<Link to="/personal/avatarEditor"><div className={styles['tab-name']}>我的头像</div></Link>} key="2" />
                <TabPane tab={<div className={styles['tab-name']}>我的收藏</div>} key="3" />
                <TabPane tab={<div className={styles['tab-name']}>我的评价</div>} key="4" />
              </Tabs>
            </div>
            <div style={{ float: 'left', minWidth: document.body.clientWidth - 350 || window.screen.width - 350 }} className={styles['personer-container']}>
              <div style={{ minHeight: 'calc(100vh - 260px)' }}>
                <Switch>
                  {
                    getRouteData('PersonalLayout').map(item =>
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
                  <Redirect exact from="/" to="/personal/userinfo" />
                </Switch>
              </div>
            </div>
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

export default PersonalLayout;
