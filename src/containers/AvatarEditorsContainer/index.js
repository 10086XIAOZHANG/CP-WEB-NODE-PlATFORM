/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { connect } from 'dva';
import { store } from '../../common/local.storage';
import Config from '../../common/config';
import AvatarEditorCell from '../../components/PersonalLayout/AvatarEditorCell';

@connect(state => ({
  personal_centered: state.personal_centered,
}))
class AvatarEditorsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  completeEditorAvatar=(base64Img) => {
    this.props.dispatch({
      type: 'personal_centered/changePartialAvatar',
      params: {
        avatar: base64Img,
      },
    });
  }
  render() {
    return (
      <div style={{ color: '#fff' }}>
        <AvatarEditorCell
          avatar={store.get(Config.defaultProps.USER_AVATAR)}
          completeEditorAvatar={this.completeEditorAvatar}
        />
      </div>
    );
  }
}

export default AvatarEditorsContainer;
