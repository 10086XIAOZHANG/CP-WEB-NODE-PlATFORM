/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import BlogContainerCarouselCell from '../../components/BlogLayout/BlogContainerCarouselCell';
import BlogContainerListCell from '../../components/BlogLayout/BlogContainerListCell';
import { store } from '../../common/local.storage';
import Config from '../../common/config';

class BlogContainerList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <BlogContainerCarouselCell carousel_data={this.props.carousel_data} />
        <div style={{ height: 20 }} />
        <BlogContainerListCell
          changeState={this.props.changeState}
          acticle_data={this.props.acticle_data}
          avatar={store.get(Config.defaultProps.USER_AVATAR)}
        />
      </div>
    );
  }
}

export default BlogContainerList;
