/**
 *创建时间:  2018/6/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Avatar, Tag } from 'antd';
import { Link } from 'dva/router';
import Styles from './style.less';

class BlogContainerActicleDetailCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className={Styles['acticle-detail']}>
        <h1 className={Styles['post-title']}>{this.props.detailData.acticle_name}</h1>
        <div className={Styles['post-author']}>
          <div className={`${Styles.avatar} ${Styles['pull-left']}`}>
            <Link to="/author/1/">
              <Avatar size="large" src={this.props.user.avatar} />
            </Link>
          </div>
          <div className={Styles['post-author-info']}>
            <p><Tag color="orange">作者</Tag> <Link className={Styles['author-name']} to="/author/1/">{this.props.user.name}</Link></p>
            <p className={Styles['post-meta']}>
              <span>{this.props.detailData.add_time}</span>
              <span>阅读 {this.props.detailData.click_num}</span>
              <span>评论 {this.props.detailData.comment_num}</span>
              <span>喜欢 {this.props.detailData.fav_num}</span>
            </p>
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div
          className={`${Styles['post-content']} ${Styles.markdown}`}
          dangerouslySetInnerHTML={{ __html: this.props.detailData.acticle_content }}
        />
      </div>
    );
  }
}

export default BlogContainerActicleDetailCell;
