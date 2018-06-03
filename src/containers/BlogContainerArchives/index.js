/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import BlogContainerArchivesCell from '../../components/BlogLayout/BlogContainerArchivesCell';

class BlogContainerArchives extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <BlogContainerArchivesCell archives_data={this.props.archives_data} />
      </div>
    );
  }
}

export default BlogContainerArchives;
