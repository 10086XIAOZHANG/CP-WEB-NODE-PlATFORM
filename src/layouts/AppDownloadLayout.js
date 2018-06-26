/**
 *创建时间:  2018/6/26
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: app下载页
 */
import React from 'react';
import AppDownloadContainer from '../containers/AppDownloadContainer';

class AppDownloadLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <AppDownloadContainer />
      </div>
    );
  }
}

export default AppDownloadLayout;
