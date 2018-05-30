/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RegisterCell from '../../components/Bases/Register';

@connect(state => ({
  user: state.user,
}))
@Form.create()
class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    // 登录成功
    if (nextProps.user.status === 'ok') {
      this.props.dispatch(routerRedux.replace('/main/Home'));
    }
  }
  getMsgCode =(username) => {
    this.props.dispatch({
      type: '/user/fetchMsgCode',
      mobile: username,
    });
  }
  registerSubmit = () => {
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
  render() {
    return (
      <div>
        <RegisterCell
          getMsgCode={this.getMsgCode}
          registerSubmit={this.registerSubmit}
          {...this.props}
        />
      </div>
    );
  }
}

export default Register;
