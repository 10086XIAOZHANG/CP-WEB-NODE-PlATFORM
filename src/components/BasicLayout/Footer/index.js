/* eslint-disable no-useless-constructor,import/no-dynamic-require */
/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Row, Col, Dropdown, Menu, Icon } from 'antd';
import styles from './style.less';

class Footer extends React.PureComponent {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:8888/user/login">简体</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:8888/user/login">繁体</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:8888/user/login">英文</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles['login-footer-layout']} >
        <Row>
          <Col span={8} offset={8} >
            <div className={styles['color-write']} >
              <span className={styles['text-center']}>建议浏览器：Chrome/IE11|建议分辨率：1290*1024|<a>清除本地缓存</a>|</span>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  语言 <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7} ><div className={styles['color-write']} ><span className={styles['text-center']}>© 2018 CP聚合博客.  All rights reserved</span></div></Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
