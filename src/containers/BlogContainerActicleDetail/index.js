/**
 *创建时间:  2018/6/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { store } from '../../common/local.storage';
import Config from '../../common/config';
import BlogContainerActicleDetailCell from '../../components/BlogLayout/BlogContainerActicleDetailCell';

@connect(state => ({
  blog_list: state.blog_list,
}))
class BlogContainerActicleDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailData: {},
    };
  }
  componentWillMount() {
    console.log(this.props.history.location.state.acticle_id);
    this.props.dispatch({
      type: 'blog_list/getBlogActicleDetails',
      id: this.props.history.location.state.acticle_id,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_list.article_details_status === 'ok') {
      this.setState({
        detailData: { ...nextProps.blog_list.article_detail_data },
      });
    }
  }
  render() {
    return (
      <div>
        <BlogContainerActicleDetailCell
          detailData={this.state.detailData}
          user={store.get(Config.defaultProps.USER_INFO)}
        />
      </div>
    );
  }
}

export default withRouter(BlogContainerActicleDetail);
