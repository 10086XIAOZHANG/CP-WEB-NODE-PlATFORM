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
  blog: state.blog,
  blog_list: state.blog_list,
}))
class BlogList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      carousel_data: '',
      acticle_data: '',
      search_text: '',
    };
  }

  componentWillMount() {
    console.log('进入blog_list/getBlogCarousels componentWillMount');
    this.props.dispatch({
      type: 'blog_list/getBlogCarousels',
    });
    this.props.dispatch({
      type: 'blog_list/getBlogActicleLists',
      params: {
        page_index: 1,
        page_size: 2,
        ordering: '-click_num',
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_list.carousel_status === 'ok') {
      this.setState({
        carousel_data: nextProps.blog_list.carousels,
      });
    }
    if (nextProps.blog_list.acticle_list_status === 'ok') {
      console.log(' acticle_data: nextProps.blog_list.acticleList,', nextProps.blog_list.acticleList);
      this.setState({
        acticle_data: nextProps.blog_list.acticleList,
      });
    }
    if (nextProps.blog.blog_acticle_search_status === 'ok') {
      this.setState({
        search_text: nextProps.blog.blogActicleSearchText,
      });
      setTimeout(() => {
        this.props.dispatch({
          type: 'blog_list/getBlogActicleLists',
          params: {
            page_index: 1,
            page_size: 2,
            ordering: '-click_num',
            search: this.state.search_text,
          },
        });
      }, 0);
    }
    if (nextProps.blog.blog_acticle_search_status === 'error') {
      this.changeState(1, 2);
    }
  }
  changeState=(page, pageSize) => {
    this.props.dispatch({
      type: 'blog_list/getBlogActicleLists',
      params: {
        page_index: page,
        page_size: pageSize,
        ordering: '-click_num',
      },
    });
  }
  render() {
    return (
      <div>
        <BlogContainerList
          changeState={this.changeState}
          carousel_data={this.state.carousel_data}
          acticle_data={this.state.acticle_data}
        />
      </div>
    );
  }
}

export default BlogList;
