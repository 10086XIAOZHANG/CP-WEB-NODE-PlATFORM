/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card, Tooltip } from 'antd';
import styles from './style.less';

const text = <span>prompt text</span>;

class BlogContainerLinksCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles.bloglinks}>
        <h1>链接</h1>
        <Card title="" noHovering className="links">
          <div className={styles['links-content']}>
            本网站是个人开发React纯个人性质的博客，记录个人的日常杂事和技术文章，同时我也主要是希望通过博客结识更多的朋友，一起交流、探讨对生活的认知
            同时也希望通过该平台和大家多对多进行交流，谢谢大家!!!
          </div>
          <div>
            <div style={{ marginLeft: 60 }}>
              <Tooltip placement="topLeft" title={text}>
                <a href="#">TL</a>
              </Tooltip>
              <Tooltip placement="top" title={text}>
                <a href="#">Top</a>
              </Tooltip>
              <Tooltip placement="topRight" title={text}>
                <a href="#">TR</a>
              </Tooltip>
            </div>
            <div style={{ width: 60, float: 'left' }}>
              <Tooltip placement="leftTop" title={text}>
                <a href="#">LT</a>
              </Tooltip>
              <Tooltip placement="left" title={text}>
                <a href="#">Left</a>
              </Tooltip>
              <Tooltip placement="leftBottom" title={text}>
                <a href="#">LB</a>
              </Tooltip>
            </div>
            <div style={{ width: 60, marginLeft: 270 }}>
              <Tooltip placement="rightTop" title={text}>
                <a href="#">RT</a>
              </Tooltip>
              <Tooltip placement="right" title={text}>
                <a href="#">Right</a>
              </Tooltip>
              <Tooltip placement="rightBottom" title={text}>
                <a href="#">RB</a>
              </Tooltip>
            </div>
            <div style={{ marginLeft: 60, clear: 'both' }}>
              <Tooltip placement="bottomLeft" title={text}>
                <a href="#">BL</a>
              </Tooltip>
              <Tooltip placement="bottom" title={text}>
                <a href="#">Bottom</a>
              </Tooltip>
              <Tooltip placement="bottomRight" title={text}>
                <a href="#">BR</a>
              </Tooltip>
            </div>
          </div>
        </Card>

      </div>
    );
  }
}

export default BlogContainerLinksCell;
