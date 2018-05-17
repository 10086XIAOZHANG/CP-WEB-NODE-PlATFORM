/**
 *创建时间:  2018/5/17
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Link } from 'dva/router';
import {
  Row, Col,
  Menu,
  Icon,
  Button,
} from 'antd';
import ClassNames from 'classnames';
import styles from './style.less';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 'top',
    };
  }
  handleClick=() => {
  }
  render() {
    return (
      <Row className={styles['header-row']}>
        <Col span={2} className={ClassNames(styles['header-border'], styles.h65, styles['white-bg'])} />
        <Col span={3} className={ClassNames(styles['header-border'], styles['white-bg'])} >
          <a href="/" className={styles.logo}>
            <img src={require('../../../assets/bases/logo_main.png')} alt="" />
          </a>
        </Col>
        <Col span={12}>
          <Menu mode="horizontal" className={styles['header-menu']} onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
            <Menu.Item key="top">
              <Icon type="appstore" />首页
            </Menu.Item>
            <Menu.Item key="guonei">
              <Icon type="appstore" />国内
            </Menu.Item>
            <Menu.Item key="guoji">
              <Icon type="appstore" />国际
            </Menu.Item>
            <Menu.Item key="yule">
              <Icon type="appstore" />娱乐
            </Menu.Item>
            <Menu.Item key="keji">
              <Icon type="appstore" />科技
            </Menu.Item>
            <Menu.Item key="shishang">
              <Icon type="appstore" />时尚
            </Menu.Item>
            <Menu.Item key="boke">
              <Link to="/blog" target="_blank">
                <Icon type="appstore" />博客
              </Link>

            </Menu.Item>
          </Menu>
        </Col>
        <Col
          span={5}
          className={ClassNames(styles['header-border'],
          styles.h65, styles['header-button'], styles['white-bg'])}
        >
          <Button icon="search" >搜索</Button>
          <Link to="/login"><Button icon="solution" > 登录</Button></Link>
          <Link to="/register"><Button icon="exception"> 注册</Button></Link>
        </Col>
        <Col span={2} className={ClassNames(styles['header-border'], styles.h65, styles['white-bg'])} />
      </Row>
    );
  }
}

export default Header;

