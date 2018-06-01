/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import BlogContainerAboutsCell from '../../components/BlogLayout/BlogContainerAboutsCell';

class BlogContainerAbouts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div style={{ color: '#fff' }}>
        <BlogContainerAboutsCell />
      </div>
    );
  }
}

export default BlogContainerAbouts;
