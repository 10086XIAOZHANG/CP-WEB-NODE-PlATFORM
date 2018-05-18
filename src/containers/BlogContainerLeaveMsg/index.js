/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import BlogContainerLeaveMsgCell from '../../components/BlogLayout/BlogContainerLeaveMsgCell';
import LzEditor from '../../modules/editor';

class BlogContainerLeaveMsg extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentsData: [],
      markdownContent: '我来抢沙发了',
    };
  }
  receiveMarkdown=(content) => {
    console.log('recieved markdown content in', content);
  }
  render() {
    return (
      <div className="blogleave_msg">
        <h1>留言</h1>

        <BlogContainerLeaveMsgCell
          total={this.state.contentsData.length}
          pageSize="8"
          contentsDate={this.state.contentsData}
          resHandle={this.resHandle.bind(this)}
          onChange={this.onChange.bind(this)}
        />
        <h1>添加新评价</h1>
        <LzEditor
          active
          importContent={this.state.markdownContent}
          cbReceiver={this.receiveMarkdown}
          image={false}
          video={false}
          audio={false}
          convertFormat="markdown"
        />
      </div>
    );
  }
}

export default BlogContainerLeaveMsg;
