/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Input, Icon, Button, Form } from 'antd';
import { Link } from 'dva/router';
import styles from './style.less';

const FormItem = Form.Item;
class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      disabled: false,
      confirmDirty: false,
    };
    this.intervalId = null;
    this.time = 60;
    this.target = null;
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  getculCount=() => {
    if (this.time === 0) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.target.getElementsByTagName('span')[0].innerHTML = '获取验证码';
      this.setState({
        disabled: false,
      });
    } else {
      this.target.getElementsByTagName('span')[0].innerHTML = `${this.time}秒后重新获取验证码`;
      this.time -= 1;
      this.setState({
        disabled: true,
      });
    }
  }
  getMsgCode=(e) => {
    this.target = e.target;
    this.intervalId = setInterval(this.getculCount, 1000);
    this.props.getMsgCode(this.state.username);
  }
  changeHandle=(e) => {
    this.setState({
      username: e.target.value,
    });
  }
  checkConfirm = (rule, value, callback) => {
    if (value && this.state.confirmDirty) {
      this.props.form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkPassword = (rule, value, callback) => {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }
  registerSubmit =() => {
    this.props.registerSubmit();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles['register-container']}>
        <h1 className={styles.mb10}>注册</h1>
        <p className={styles.mb10}>欢迎加入</p>
        <Form>
          <div className={styles.mb10}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入电话号码!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} value={this.state.username} onChange={this.changeHandle} placeholder="输入手机号" />
              )}
            </FormItem>
          </div>
          <div className={styles.mb10}>
            <FormItem>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input addonBefore={<Icon type="lock" style={{ fontSize: 13 }} />} addonAfter={<Button type="primary" disabled={this.state.disabled} onClick={this.getMsgCode}>获取短信验证码</Button>} placeholder="请输入短信验证码" />
              )}
            </FormItem>
          </div>
          <div className={styles.mb10}>
            <FormItem
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input prefix={<Icon type="safety" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
          </div>
          <div cclassName={styles.mb10}>
            <FormItem
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请再输入密码!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input prefix={<Icon type="safety" style={{ fontSize: 13 }} />} type="password" placeholder="请再输入密码" />
              )}
            </FormItem>
          </div>
          <button className={styles['btn-login']} onClick={this.registerSubmit} htmlType="submit">注册</button>
        </Form>
        <p className={styles.hadlogin}>已有账号？去<Link to="/main/login">登录</Link></p>
      </div>
    );
  }
}

export default Register;
