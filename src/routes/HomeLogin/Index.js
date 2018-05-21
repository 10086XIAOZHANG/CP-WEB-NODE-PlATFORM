/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Form } from 'antd';
import Config from '../../common/config';
import { store } from '../../common/local.storage';
import HomeContainerLogin from '../../containers/HomeContainerLogin';

@connect(state => ({
  login: state.login,
  messageStatus: state.global.messageStatus,
}))
@Form.create()
class HomeLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 'account',
    };
  }
  componentWillReceiveProps(nextProps) {
    // 登录成功
    if (nextProps.login.status === 'ok') {
      const userInfo = nextProps.login.info[0];
      // 模拟登录成功用户Token，2个小时超时哦
      store.set(Config.defaultProps.USER_TOKEN, (new Date()).getTime());
      store.set(Config.defaultProps.USER_ID, userInfo); // 存储登录信息
      this.props.dispatch(routerRedux.push('/'));
    }
    console.log('登陆失败', nextProps.login.status);
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
    // if (this.props.messageStatus) return; // 弹窗未完全关闭禁止再次提交
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        console.log('这是登录信息', values);
        if (!err) {
          this.props.dispatch({
            type: `login/${type}Submit`,
            payload: values,
          });
        }
      }
    );
  };
  render() {
    return (
      <div>
        <HomeContainerLogin
          type={this.state.type}
          handleSubmit={this.handleSubmit}
          {...this.props}
        />
      </div>
    );
  }
}

export default HomeLogin;
