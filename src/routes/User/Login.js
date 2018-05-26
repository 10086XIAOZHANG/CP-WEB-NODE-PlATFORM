/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

/* eslint-disable prefer-destructuring */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { fromJS } from 'immutable';
import { Form, Input, Button, Icon, Layout, Row, Col, Dropdown, Menu } from 'antd';
import Config from '../../common/config';
import { store } from '../../common/local.storage';
import styles from './Login.less';

const FormItem = Form.Item;
const { Header, Footer } = Layout;
@connect(state => ({
  login: state.login,
  messageStatus: state.global.messageStatus,
}))
@Form.create()
export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.bgCount = 1;
    this.time = null;
    this.state = {
      type: fromJS({
        type: 'account',
      }),
      bg: require('../../assets/login/bg/bg1.jpg'),
    };
  }
  componentDidMount() {
    this.time = setInterval(() => {
      this.bgCount += 1;
      if (this.bgCount === 4) {
        this.bgCount = 1;
      }
      switch (this.bgCount) {
        case 1:
          this.setState({
            bg: require('../../assets/login/bg/bg1.jpg'),
          });
          break;
        case 2:
          this.setState({
            bg: require('../../assets/login/bg/bg2.jpg'),
          });
          break;
        case 3:
          this.setState({
            bg: require('../../assets/login/bg/bg3.jpg'),
          });
          break;
        default:
          this.setState({
            bg: require('../../assets/login/bg/bg1.jpg'),
          });
          break;
      }
    }, 4000);
  }

  componentWillReceiveProps(nextProps) {
    // 登录成功
    if (nextProps.login.status === 'ok') {
      const userInfo = nextProps.login.info[0];
      store.set(Config.defaultProps.USER_ID, userInfo); // 存储登录信息
      this.props.dispatch(routerRedux.push('/'));
    }

    // 登录失败
    if (nextProps.login.status === 'error') {
      this.props.dispatch({
        type: 'global/changeErrorMessage',
        payload: '账户或密码错误',
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }
  isNull= (str) => {
    if (str === '') return true;
    const regu = '^[ ]+$';
    const re = new RegExp(regu);
    return re.test(str);
  };
  handleSubmit = (e) => {
    console.log('sumit 点击事件');
    e.preventDefault();
    console.log('sumit 点击事件1');
    // if (this.props.messageStatus) return; // 弹窗未完全关闭禁止再次提交
    console.log('sumit 点击事件2');
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        console.log('这是登录信息', values);
        if (!err) {
          this.props.dispatch({
            type: `login/${type.get('type')}Submit`,
            payload: values,
          });
        }
      }
    );
  };

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const menu = (
      <Menu>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:8888/user/login">简体</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:8888/user/login">繁体</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:8888/user/login">英文</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className={styles['login-layout']} style={{ backgroundImage: `url(${this.state.bg})` }} >
        <Header className={styles['login-header-layout']}>
          <Row type="flex" justify="space-between">
            <Col span={10}><img alt="" src={require('../../assets/bases/logo.png')} /></Col>
            <Col xs={16} sm={16} md={14} lg={12} xl={10}>
              <Row gutter={1}>
                <Col span={6} ><Link to={{ pathname: '/main/Home', state: { currentUser: null } }} style={{ width: '100%', fontSize: 18 }}>随笔首页</Link></Col>
                <Col span={6} ><Link to="/user" style={{ width: '100%', fontSize: 18 }}>客户端下载</Link></Col>
                <Col span={6} ><Link to="/user" style={{ width: '100%', fontSize: 18 }}>官方贴吧</Link></Col>
                <Col span={6} ><Link to="/user" style={{ width: '100%', fontSize: 18 }}>官方微博</Link></Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Layout className={styles['login-center-layout']} >
          <Row type="flex" justify="start" className={styles['login-center-content']} >
            <Col xs={20} sm={16} md={11} lg={8} xl={6} className={styles['login-form-container']}>
              <div className={styles['login-form']}>
                <Form style={{ marginBottom: '10px' }} >
                  <FormItem
                    label="用户"
                    hasFeedback
                  >
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" />}
                        placeholder="请输入用户名"
                      />
                    )}
                  </FormItem>
                  <FormItem
                    label="密码"
                    hasFeedback
                  >
                    {getFieldDecorator('pwd', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                    )}
                  </FormItem>
                  <Row gutter={2}>
                    <Col span={24}>
                      <Row gutter={2} type="flex" justify="space-between">
                        <Col span={8} >  <Button type="primary" style={{ width: '100%' }} className={styles['submit-btn']} loading={login.submitting} size="large" htmlType="submit" onClick={this.handleSubmit}>确定</Button></Col>
                        <Col span={12}><div className={styles['form-link']}><Link to="/" style={{ paddingRight: 16 }}>忘记密码</Link><Link to="/">新用户登陆</Link></div></Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
                <div className={styles['other-platform-login']}>
                  <p>第三方平台登录</p>
                  <div>
                    <Link to="/qq"><img alt="qq" src={require('../../assets/login/icon/qq.svg')} /></Link>
                    <Link to="/weibo"><img alt="微博" src={require('../../assets/login/icon/weibo.svg')} /></Link>
                    <Link to="/weixin"><img alt="微信" src={require('../../assets/login/icon/weixin.svg')} /></Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Layout>
        <Footer className={styles['login-footer-layout']} >
          <Row>
            <Col span={10} offset={8} >
              <div className={styles['color-write']} >
                <span className={styles['text-center']}>建议浏览器：Chrome/IE11|建议分辨率：1290*1024|<a>清除本地缓存</a>|</span>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    语言 <Icon type="down" />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={10} offset={7} ><div className={styles['color-write']} ><span className={styles['text-center']}>© 2018 cp.  All rights reserved</span></div></Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}
