/**
 *创建时间:  2018/6/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import BlogContainerActicleDetail from '../../containers/BlogContainerActicleDetail';
import styles from './Index.less';

class BlogActicleDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles['blog-container-acticle-detail']}>
        <BlogContainerActicleDetail />
      </div>
    );
  }
}

export default BlogActicleDetail;
