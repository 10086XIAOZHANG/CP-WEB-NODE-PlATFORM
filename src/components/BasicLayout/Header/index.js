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
      status: this.props.status,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('进入nextProps header中', nextProps.status);
    this.setState({
      status: nextProps.status,
    });
  }
  onMenuClick=({ key }) => {
    this.props.onMenuClick({ key });
  }
  onTitleMenuClick=(item) => {
    if (item.key === 'top') {
      this.props.onTitleMenuClick();
    }
  }
  render() {
    const menu = (
      <Menu theme="dark" className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled key="user"><Link to="/personal/userinfo"><Icon type="user" />个人中心</Link></Menu.Item>
        <Menu.Item disabled key="setting"><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Row className={styles['header-row']}>
        {/* <Col span={1} className={ClassNames(styles['header-border'],
         styles.h65, styles['white-bg'])} /> */}
        <Col span={3} className={ClassNames(styles['header-border'], styles['white-bg'])} >
          <a href="/" className={styles.logo}>
            <img src={require('../../../assets/bases/logo_main.png')} alt="" />
          </a>
        </Col>
        <Col span={11}>
          <Menu mode="horizontal" className={styles['header-menu']} onClick={this.onTitleMenuClick} selectedKeys={[this.state.current]}>
            <Menu.Item key="top">
              <Icon type="home" />首页
            </Menu.Item>
            <Menu.Item key="guonei">
              <Icon type="shop" />国内
            </Menu.Item>
            <Menu.Item key="guoji">
              <Icon type="global" />国际
            </Menu.Item>
            <Menu.Item key="keji">
              <Icon type="trophy" />科技
            </Menu.Item>
            <Menu.Item key="shishang">
              <Icon type="car" />时尚
            </Menu.Item>
            <Menu.Item key="bowen">
              <Icon type="coffee" />博文
            </Menu.Item>
            <Menu.Item key="boke">
              <Link to="/blog">
                <Icon type="laptop" />博客
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col
          span={10}
          className={ClassNames(styles['header-border'],
          styles.h65, styles['header-button'], styles['white-bg'])}
        >
          <Col span={5}>
            <Link to="/appDown"><Button icon="download" > APP 下载</Button></Link>
          </Col>
          <Col span={19}>
            {this.state.status && this.state.status === 'ok' && this.props.currentUser ? (
              <Row>
                <Col span={10}>
                  <Input.Search
                    placeholder="请输入搜索内容"
                    style={{ width: '100%' }}
                    onSearch={value => console.log(value)}
                  />
                </Col>
                <Col span={7}>
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <div className={styles['header-right']}>
                      <div className={styles['user-inf']}>
                        <Avatar size="large" className={styles.avatar} src={this.props.currentUser.avatar || require('../../../assets/login/avatar/default_avatar.jpg')} />
                        {this.props.currentUser.name || this.props.currentUser.mobile}
                      </div>
                    </div>
                  </Dropdown>
                </Col>
                <Col span={5}>
                  <div className={styles['header-right']}><span className={styles['platform-help']}><span className={styles['split-line']} /><Link to="/help"><Button icon="question-circle-o"> 帮助</Button></Link></span></div>
                </Col>
              </Row>
            ) :
              <Row>
                <Col span={10}>
                  <Input.Search
                    placeholder="请输入搜索内容"
                    style={{ width: '100%' }}
                    onSearch={value => console.log(value)}
                  />
                </Col>
                <Col span={5} offset={1}>
                  <Link to="/main/login"><Button icon="solution" > 登录</Button></Link>
                </Col>
                <Col span={5}>
                  <Link to="/main/register"><Button icon="exception"> 注册</Button></Link>
                </Col>
              </Row>
            }
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Header;

