/**
 *创建时间:
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import HomeHeader from '../../../components/BasicLayout/Header';

@connect(state => ({
  home: state.home,
}))
class PCHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  }
  onTitleMenuClick=() => {
    this.props.history.push('/main/Home');
  }
  render() {
    return (
      <HomeHeader
        currentUser={this.props.currentUser}
        onMenuClick={this.onMenuClick}
        onTitleMenuClick={this.onTitleMenuClick}
      />
    );
  }
}

export default withRouter(PCHeader);
