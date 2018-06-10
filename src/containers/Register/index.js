/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Icon, Button, Form } from 'antd';
import styles from './style.less';

const FormItem = Form.Item;
@connect(state => ({
  global: state.global,
  user: state.user,
}))
class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      confirmDirty: false,
    };
    this.time = 60;
    this.target = null;
    this.sendCaptStatus = false;
  }

  componentWillReceiveProps(nextProps) {
    // 登录成功
    if (nextProps.user.status === 'ok') {
      this.props.dispatch({
        type: 'login/registerChangeSubmitting',
        payload: true,
      });
      this.props.dispatch(routerRedux.replace('/main/Home'));
    }
    if (nextProps.user.captStatus === 'ok') {
      this.props.dispatch({
        type: 'user/changeCaptStatus',
        status: 'error',
      });
      this.props.dispatch({
        type: 'global/changeSuccessMessage',
        payload: '验证码已发出',
      });
    }
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
      this.sendCaptStatus = false;
    } else {
      this.target.getElementsByTagName('span')[0].innerHTML = `${this.time}秒后重新获取验证码`;
      this.time -= 1;
      this.setState({
        disabled: true,
      });
    }
  }
  registerSubmit = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    console.log('进入registerSubmit');
    this.props.form.validateFields({ force: true },
      (err, values) => {
        console.log('这是注册信息信息信息', values);
        if (!err) {
          this.props.dispatch({
            type: 'user/registerSubmit',
            payload: values,
          });
        }
      }
    );
  }
  sendCapt =(phoneNumber) => {
    this.props.dispatch({
      type: 'user/fetchMsgCode',
      phoneNumber,
    });
  }
  sendMsgCode=(e) => {
    this.target = e.target;
    if (!this.sendCaptStatus && this.phoneInput.input.value !== '') {
      this.sendCapt(this.phoneInput.input.value);
      this.sendCaptStatus = true;
    }
    console.log(this.sendCaptStatus, this.phoneInput.input.value);
    this.intervalId = setInterval(this.getculCount, 1000);
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
                initialValue: '',
              })(
                <Input ref={(phoneInput) => { this.phoneInput = phoneInput; }} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入手机号" />
              )}
            </FormItem>
          </div>
          <div className={styles.mb10}>
            <FormItem>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input addonBefore={<Icon type="lock" style={{ fontSize: 13 }} />} addonAfter={<Button type="primary" disabled={this.state.disabled} onClick={this.sendMsgCode}>获取短信验证码</Button>} placeholder="请输入短信验证码" />
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
          <div className={styles.mb10}>
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

export default Form.create()(Register);
