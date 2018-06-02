/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import BlogContainerEditorCell from '../../components/BlogLayout/BlogContainerEditorCell';

@connect(state => ({
  blog_list: state.blog_list,
}))
class BlogContainerEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog_list.article_publish_status === 'ok') {
      this.props.dispatch({
        type: 'global/changeSuccessMessage',
        payload: '文章发布成功',
      });
    }
  }
  onPublicActicle=(typeList, acticleTitle, content) => {
    if (typeList.length === 0 || acticleTitle === '' || content === '') {
      this.props.dispatch({
        type: 'global/changeErrorMessage',
        payload: '文章内容不能为空',
      });
    } else {
      this.props.dispatch({
        type: 'blog_list/publicActicle',
        params: {
          acticleTitle,
          content,
          acticleType: typeList.join(','),
        },
      });
      this.props.history.push('/blog/index');
    }
  }
  render() {
    return (
      <div>
        <BlogContainerEditorCell onPublicActicle={this.onPublicActicle} />
      </div>
    );
  }
}

export default withRouter(BlogContainerEditor);
