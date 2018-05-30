/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { connect } from 'dva';
import BlogContainerList from '../../containers/BlogContainerList';

@connect(state => ({
  blog_list: state.blog_list,
}))
class BlogList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      carousel_data: '',
    };
  }

  componentWillMount() {
    console.log('进入blog_list/getBlogCarousels componentWillMount');
    this.props.dispatch({
      type: 'blog_list/getBlogCarousels',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_list.carousel_status === 'ok') {
      this.setState({
        carousel_data: nextProps.blog_list.carousels,
      });
    }
  }
  render() {
    return (
      <div>
        <BlogContainerList carousel_data={this.state.carousel_data} />
      </div>
    );
  }
}

export default BlogList;
