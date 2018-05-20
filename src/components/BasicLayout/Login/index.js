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

class Login extends React.PureComponent {
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
      <div>
        <div className={styles['login-container']}>
          <h1 className={styles.mb10}>登录</h1>
          <p className={styles.mb10}>欢迎回来</p>
          <div className={styles.mb10}>
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} value={this.state.username} onChange={this.changeHandle} placeholder="输入用户名" />
          </div>
          <div className={styles.mb10}>
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          </div>
          <button className={styles['btn-login']} onClick={this.clickHandle}>登录</button>
          Or <Link to="/register">register now!</Link>
        </div>
      </div>
    );
  }
}

export default Login;
