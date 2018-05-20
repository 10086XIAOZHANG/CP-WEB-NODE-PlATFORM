/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Input, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './style.less';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
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
          <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="请输入邮箱" />
        </div>
        <div className={styles.mb10}>
          <Input addonBefore={<Icon type="lock" style={{ fontSize: 13 }} />} addonAfter={<img alt="" src="http://demo.sisome.com/action/TeUser?do=captcha&h=32&w=120&t=register&0.7511157879908745" style={{ width: 20 }} />} defaultValue="请输入验证码" />
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
