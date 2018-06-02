/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import BlogContainerLeaveMsgCell from '../../components/BlogLayout/BlogContainerLeaveMsgCell';
import LeaveMsgCommentEditorCell from '../../components/BlogLayout/LeaveMsgCommentEditorCell';

import styles from './style.less';

@connect(state => ({
  blog_leave_msg: state.blog_leave_msg,
}))
@Form.create()
class BlogContainerLeaveMsg extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentsData: [],
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'blog_leave_msg/queryUserLeavingMessage',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_leave_msg.blog_leave_msg_status === 'ok') {
      console.log(nextProps.blog_leave_msg.leavingMessagesList, 'nextProps.blog_leave_msg.leavingMessagesList');
      this.setState({
        contentsData: [...nextProps.blog_leave_msg.leavingMessagesList],
      });
    }
  }
  onChange=(page, pageSize) => {
    console.log(page, pageSize);
  }
  onResHandle=() => {

  }
  onPublicMsg=(file) => {
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          const params = values;
          params.file = file;
          console.log('file', file);
          this.props.dispatch({
            type: 'blog_leave_msg/publicMsg',
            params,
          });
        }
      }
    );
  }
  render() {
    return (
      <div className={styles['blogleave-msg']}>
        <LeaveMsgCommentEditorCell onPublicMsg={this.onPublicMsg} {...this.props} />
        <BlogContainerLeaveMsgCell
          total={this.state.contentsData.length}
          pageSize={3}
          contentsDate={this.state.contentsData}
          resHandle={this.onResHandle}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default BlogContainerLeaveMsg;
