/* eslint-disable no-useless-constructor,import/no-dynamic-require */
/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Row, Col } from 'antd';
import styles from './style.less';

class Footer extends React.PureComponent {
  render() {
    return (
      <div className={styles['login-footer-layout']} >
        <Row>
          <Col span={10} offset={7} ><div className={styles['color-write']} ><span className={styles['text-center']}>© 2018 CP聚合博客.  All rights reserved</span></div></Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
