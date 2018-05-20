/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import BlogContainerLeaveMsgCell from '../../components/BlogLayout/BlogContainerLeaveMsgCell';
import LeaveMsgCommentEditorCell from '../../components/BlogLayout/LeaveMsgCommentEditorCell';
import Config from '../../common/config';

import styles from './style.less';

class BlogContainerLeaveMsg extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentsData: [
        {
          uimg: `${Config.defaultProps.resource_server}/login/avatar.png`,
          uname: '张三1',
          content: '这网站不错',
          approval_num: 1,
          public_date: '2018-1-2',
        },
        {
          uimg: `${Config.defaultProps.resource_server}/login/avatar.png`,
          uname: '张三2',
          content: '这网站不错y',
          approval_num: 4,
          public_date: '2018-4-2',
        },
        {
          uimg: `${Config.defaultProps.resource_server}/login/avatar.png`,
          uname: '张三3',
          content: '这网站不错哟',
          approval_num: 5,
          public_date: '2018-5-12',
        },
      ],
      // content: '我来抢沙发了',
    };
  }
  onChange=(page, pageSize) => {
    console.log(page, pageSize);
  }
  resHandle=() => {

  }
  render() {
    return (
      <div className={styles['blogleave-msg']}>
        <LeaveMsgCommentEditorCell />
        <BlogContainerLeaveMsgCell
          total={this.state.contentsData.length}
          pageSize="8"
          contentsDate={this.state.contentsData}
          resHandle={this.resHandle}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default BlogContainerLeaveMsg;
