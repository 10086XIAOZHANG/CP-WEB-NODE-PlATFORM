/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { store } from '../../common/local.storage';
import Config from '../../common/config';
import PersonalInfo from '../../components/BasicLayout/PersonalInfo';

@connect(state => ({
  personal_centered: state.personal_centered,
}))
@Form.create()
class PersonalCenteredContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.personal_centered.partial_user_status === 'ok') {
      this.props.dispatch({
        type: 'global/changeSuccessMessage',
        payload: '修改成功',
      });
      this.props.dispatch({
        type: 'personal_centered/changePartialStatus',
        status: 'error',
      });
    }
  }
  onUserInfoSubmit=() => {
    console.log('这是个人修改信息1');
    this.props.form.validateFields({ force: true },
      (err, values) => {
        const newVal = values;
        newVal.birthday = moment(values.birthday).format('YYYY-MM-DD');
        console.log('这是个人修改信息', newVal);
        if (!err) {
          this.props.dispatch({
            type: 'personal_centered/changePartialUserInfo',
            params: newVal,
          });
        }
      }
    );
  }
  render() {
    const userinfo = store.get(Config.defaultProps.USER_INFO);
    return (
      <div>
        <PersonalInfo
          {...this.props}
          onUserInfoSubmit={this.onUserInfoSubmit}
          userInfo={userinfo}
        />
      </div>
    );
  }
}

export default PersonalCenteredContainer;
