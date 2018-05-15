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
import { Form, Input, Select, Button, Checkbox, Icon, Layout, Row, Col, Radio, Dropdown, Menu } from 'antd';
import Config from '../../common/config';
import { store } from '../../common/local.storage';
import styles from './Login.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Footer } = Layout;
const RadioGroup = Radio.Group;
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
    };
  }

  componentWillReceiveProps(nextProps) {
    // 登录成功
    if (nextProps.login.status === 'ok') {
      const userInfo = nextProps.login.info;
      // 模拟登录成功用户Token，2个小时超时哦
      store.set(Config.USER_TOKEN, (new Date()).getTime());
      store.set(Config.USER_ID, userInfo[0].id); // 存储登录信息
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.messageStatus) return; // 弹窗未完全关闭禁止再次提交
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `login/${type.get('type')}Submit`,
            payload: values,
          });
        }
      }
    );
  }

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
          <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8} >K/3 WISE 供应链云平台</Col>
          </Row>
        </Header>
        <Layout className={styles['login-center-layout']}>
          <Row>
            <Col span={14} />
            <Col offset={16} xs={20} sm={16} md={12} lg={8} xl={6} >
              <div className={styles['login-form']}>
                <Form horizontal="true" >
                  <FormItem
                    label=""
                    wrapperCol={{ offset: 1 }}
                  >
                    {getFieldDecorator('radio-group')(
                      <RadioGroup >
                        <Radio value="a">命名用户身份</Radio>
                        <Radio value="b">单点用户</Radio>
                        <Radio value="c">域用户</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                  <FormItem
                    label="账套"
                    hasFeedback
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Select placeholder="请选择账套" style={{ width: '100%' }}>
                      <Option value="china">蓝海柴油机公司</Option>
                      <Option value="use">蓝海账号2</Option>
                      <Option value="japan">蓝海账号3</Option>
                    </Select>
                  </FormItem>
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
                    {getFieldDecorator('password', {
                    rules: [{ required: true, pattern: /^[0-9a-zA-Z._$%&*!@~?<>,]{6,32}$/, message: '请输入你的密码!' }],
                  })(
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
                      <img alt="" src="http://images2015.cnblogs.com/blog/875028/201605/875028-20160513234811280-1452474757.png" style={{ height: '34px', width: '120px', display: 'inline-block' }} />
                    </Col>
                  </Row>
                  <Row gutter={2}>
                    <Col span={6} />
                    <Col span={18}>
                      <Row gutter={2}>
                        <Col span={12} >  <Button type="primary" loading={login.submitting} htmlType="submit" onClick={this.handleSubmit}>确定</Button></Col>
                        <Col span={12} > <Button type="ghost" onClick={this.handleReset}>取消</Button></Col>
                      </Row>
                    </Col>
                  </Row>
                  <FormItem
                    hasFeedback
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    label={<span />}
                  >
                    <Checkbox className={styles['color-write']} >记住登录状态</Checkbox>
                  </FormItem>
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
            <Col span={10} offset={9} ><div className={styles['color-write']} ><span className={styles['text-center']}>© 2018 kingdee.  All rights reserved</span></div></Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}
