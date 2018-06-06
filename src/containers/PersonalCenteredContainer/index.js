/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Form } from 'antd';
import { store } from '../../common/local.storage';
import Config from '../../common/config';
import PersonalInfo from '../../components/BasicLayout/PersonalInfo';

@Form.create()
class PersonalCenteredContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
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
