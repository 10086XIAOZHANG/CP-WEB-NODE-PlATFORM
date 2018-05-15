/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

/* eslint-disable prefer-destructuring */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { fromJS } from 'immutable';
import { Form, Input, Select, Button, Icon, Layout, Row, Col, Dropdown, Menu } from 'antd';
import Config from '../../common/config';
import { store } from '../../common/local.storage';
import styles from './Login.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Footer } = Layout;
@connect(state => ({
  login: state.login,
  messageStatus: state.global.messageStatus,
}))
@Form.create()
export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: fromJS({
        type: 'account',
      }),
      DBAccounts: [],
      DBAddress: '',
    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.data) {
      this.setState({
        DBAccounts: nextProps.login.data.Data,
      });
    }
    // 登录成功
    if (nextProps.login.status === 'ok') {
      const userInfo = nextProps.login.info;
      // 模拟登录成功用户Token，2个小时超时哦
      store.set(Config.defaultProps.K3_DB_ADDRESS, this.state.DBAddress.input.value);
      store.set(Config.defaultProps.SESSION_KEY, userInfo.Data.SessionKey);
      store.set(Config.defaultProps.ACCT_ID, userInfo.Data.LogonUser.AcctId);
      store.set(Config.defaultProps.USER_TOKEN, (new Date()).getTime());
      store.set(Config.defaultProps.USER_ID, userInfo.Data.LogonUser); // 存储登录信息
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
  onBlur=() => {
    // 可以使用this.props.form替代ref
    if (!this.isNull(this.state.DBAddress.input.value)) {
      this.props.dispatch({
        type: 'login/getAcctList',
        payload: this.state.DBAddress.input.value,
      });
    }
  };
  selectItem=() => {
    const row = [];
    this.state.DBAccounts.forEach((DBAccount) => {
      row.push(<Option value={DBAccount.AcctId}>{DBAccount.AcctName}</Option>);
    });
    return row;
  };
  isNull= (str) => {
    if (str === '') return true;
    const regu = '^[ ]+$';
    const re = new RegExp(regu);
    return re.test(str);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.messageStatus) return; // 弹窗未完全关闭禁止再次提交
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        const url = `${this.state.DBAddress.input.value}/WMSapi/api/Account/Login?userName=${values.username}&password=${values.password ? values.password : ''}&acctId=${values.acctId}&deviceType=1&clientId=&isResetLogin=false`;
        if (!err) {
          this.props.dispatch({
            type: `login/${type.get('type')}Submit`,
            payload: url,
          });
        }
      }
    );
  };

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;
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
      <Layout className={styles['login-layout']}>
        <Header className={styles['login-header-layout']}>
          <Row type="flex" justify="start">
            <Col span={10}><img alt="" src={require('../../assets/bases/logo.png')} /></Col>
          </Row>
        </Header>
        <Layout className={styles['login-center-layout']} >
          <Row type="flex" justify="start" className={styles['login-center-content']} >
            <Col span={13} className={styles['login-conter-img']} />
            <Col xs={20} sm={16} md={11} lg={8} xl={6} className={styles['login-form-container']}>
              <div className={styles['login-form']}>
                <Form onSubmit={this.handleSubmit} horizontal="true" style={{ marginBottom: '10px' }} >
                  <FormItem
                    label="用户"
                    hasFeedback
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('username', {
                      rules: [{
                        required: type.get('type') === 'account', message: '请输入用户名！',
                      }],
                    })(
                      <Input
                        prefix={<Icon type="user" className={styles.prefixIcon} />}
                        placeholder="请输入用户名"
                      />
                    )}
                  </FormItem>
                  <FormItem
                    label="密码"
                    hasFeedback
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('password')(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                    )}
                  </FormItem>
                  <Row gutter={2}>
                    <Col span={12}>
                      <FormItem
                        id="control-input"
                        label="验证码"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                      >
                        <Input id="control-input" placeholder="验证码" />
                      </FormItem>
                    </Col>
                    <Col span={12}>
                      <img alt="" src={`${Config.defaultProps.resource_server}//acct//acct.png`} style={{ height: '34px', width: '120px', display: 'inline-block' }} />
                    </Col>
                  </Row>
                  <Row gutter={2}>
                    <Col span={4} />
                    <Col span={18}>
                      <Row gutter={2}>
                        <Col span={22} >  <Button type="primary" style={{ width: '100%' }} loading={login.submitting} size="large" htmlType="submit">确定</Button></Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col span={2} />
          </Row>
        </Layout>
        <Footer className={styles['login-footer-layout']} >
          <Row>
            <Col span={8} offset={8} >
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
            <Col span={10} offset={7} ><div className={styles['color-write']} ><span className={styles['text-center']}>© 2018 kingdee.  All rights reserved</span></div></Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}
