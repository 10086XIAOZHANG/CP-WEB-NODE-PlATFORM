/**
 *创建时间:  2018/5/19
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { connect } from 'dva';
import BlogContainerArchives from '../../containers/BlogContainerArchives';

@connect(state => ({
  blog_list: state.blog_list,
}))
class BlogArchives extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      archives_data: {},
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'blog_list/getBlogArchives',
      params: {
        page_size: 100,
        ordering: '-add_time',
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_list.archives_status === 'ok') {
      console.log(' acticle_data: nextProps.blog_list.acticleList,', nextProps.blog_list.archives_data);
      this.setState({
        archives_data: nextProps.blog_list.archives_data,
      });
    }
  }
  render() {
    return (
      <BlogContainerArchives archives_data={this.state.archives_data} />
    );
  }
}

export default BlogArchives;
