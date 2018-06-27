/* eslint-disable no-script-url,no-underscore-dangle */
/**
 *创建时间:  2018/6/27
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';

class BaiduShare extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount= function () {
    const script = document.createElement('script');
    script.src = `http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=${~(-new Date() / 36e5)}`;
    document.body.appendChild(script);
    window._bd_share_config = {
      common: {
        bdText: '记录生活的每一天，最新博客和最热博客资讯',
        bdDesc: '聚合博客APP下载',
        bdUrl: window.location.href,
        bdPic: require('../../../assets/bases/logo.png'),
      },
      share: [{
        bdSize: 16,
      }],
      slide: [{
        bdImg: 0,
        bdPos: 'right',
        bdTop: 300,
      }],
      image: [{
        viewType: 'list',
        viewPos: 'top',
        viewColor: 'black',
        viewSize: '16',
        viewList: ['qzone', 'tsina', 'huaban', 'tqq', 'renren'],
      }],
      selectShare: [{
        bdselectMiniList: ['qzone', 'tqq', 'kaixin001', 'bdxc', 'tqf'],
      }],
    };
  }
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
      </div>
    );
  }
}

export default BaiduShare;
