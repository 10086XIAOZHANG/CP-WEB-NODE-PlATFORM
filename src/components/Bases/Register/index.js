/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Input, Icon, Button } from 'antd';
import { Link } from 'dva/router';
import styles from './style.less';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      disabled: false,
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
  }
  changeHandle=(e) => {
    this.setState({
      username: e.target.value,
    });
  }
  clickHandle=() => {
  }
  render() {
    return (
      <div className={styles['register-container']}>
        <h1 className={styles.mb10}>注册</h1>
        <p className={styles.mb10}>欢迎加入</p>
        <div className={styles.mb10}>
          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} value={this.state.username} onChange={this.changeHandle} placeholder="输入手机号" />
        </div>
        <div className={styles.mb10}>
          <Input addonBefore={<Icon type="lock" style={{ fontSize: 13 }} />} addonAfter={<Button type="primary" disabled={this.state.disabled} onClick={this.getMsgCode}>获取短信验证码</Button>} placeholder="请输入短信验证码" />
        </div>
        <div className={styles.mb10}>
          <Input prefix={<Icon type="safety" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
        </div>
        <div cclassName={styles.mb10}>
          <Input prefix={<Icon type="safety" style={{ fontSize: 13 }} />} type="password" placeholder="请再输入密码" />
        </div>
        <button className={styles['btn-login']} onClick={this.clickHandle}>注册</button>
        <p className={styles.hadlogin}>已有账号？去<Link to="/main/login">登录</Link></p>
      </div>
    );
  }
}

export default Register;
