/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import BlogContainerLinksCell from '../../components/BlogLayout/BlogContainerLinksCell';

class BlogContainerLinks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <BlogContainerLinksCell />
      </div>
    );
  }
}

export default BlogContainerLinks;
