/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import AvatarEditorsContainer from '../../containers/AvatarEditorsContainer';

class AvatarEditors extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <AvatarEditorsContainer />
      </div>
    );
  }
}

export default AvatarEditors;
