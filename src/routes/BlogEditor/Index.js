/**
 *创建时间:  2018/5/19
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import BlogContainerEditor from '../../containers/BlogContainerEditor';

class BlogEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <BlogContainerEditor />
      </div>
    );
  }
}

export default BlogEditor;
