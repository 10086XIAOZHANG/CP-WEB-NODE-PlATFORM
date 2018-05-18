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
  Input,
  Avatar,
  Dropdown,
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
  onMenuClick=({ key }) => {
    this.props.onMenuClick({ key });
  }
  handleClick=() => {
  }
  render() {
    const menu = (
      <Menu theme="dark" className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled key="user"><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled key="setting"><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
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
          <Input.Search
            placeholder="请输入搜索内容"
            style={{ width: 200 }}
            onSearch={value => console.log(value)}
          />
          <div className={styles['header-right']}><span className={styles['platform-help']}><span className={styles['split-line']} /><Link to="/help"><Button icon="question-circle-o"> 帮助</Button></Link></span></div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <div className={styles['header-right']}>
              <div className={styles['user-inf']}>
                <Avatar size="large" className={styles.avatar} src={this.props.currentUser.avatar} />
                {this.props.currentUser.name}
              </div>
            </div>
          </Dropdown>
          {/* <Link to="/login"><Button icon="solution" > 登录</Button></Link> */}
          {/* <Link to="/register"><Button icon="exception"> 注册</Button></Link> */}
        </Col>
        <Col span={2} className={ClassNames(styles['header-border'], styles.h65, styles['white-bg'])} />
      </Row>
    );
  }
}

export default Header;

