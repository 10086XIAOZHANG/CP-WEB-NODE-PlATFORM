/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import BlogContainerCarouselCell from '../../components/BlogLayout/BlogContainerCarouselCell';
import BlogContainerListCell from '../../components/BlogLayout/BlogContainerListCell';

class BlogContainerList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <BlogContainerCarouselCell />
        <div style={{ height: 20 }} />
        <BlogContainerListCell />
      </div>
    );
  }
}

export default BlogContainerList;
