/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Spin } from 'antd';
import styles from './KdMainControl.less';
// import Config from "../../common/config";
// import Store from "store";
@connect(state => ({
  chart: state.chart,
  // searchText: state.searchText,
  mainMenu: state.mainMenu,
}))
export default class KdMainControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      kdMainNavs: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'mainMenu/getMainModuleMeuns',
      payload: true,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      kdMainNavs: nextProps.mainMenu.mainMenu,
    });
  }
  componentWillUnmount() {
  }
  getContentBar=(title) => {
    return <div className={styles['content-bar']}>{title}</div>;
  };
  getContent=() => {
    const rows = [];
    if (this.state.kdMainNavs && this.state.kdMainNavs.length > 0) {
      this.state.kdMainNavs.forEach((kdMainNav) => {
        rows.push(
          <div className={styles['content-bar']}>{kdMainNav.title}</div>
        );
        const temp = [];
        kdMainNav.childNav.forEach((childNav) => {
          temp.push(
            <Col span={4}>
              <Card onClick={() => { this.changeLayoutSiderState(childNav.type, childNav.childType); }} className={styles['content-card']}>
                <div className={styles['content-card-left']}><img alt="" src={childNav.icon} style={{ width: 40, height: 40 }} /></div>
                <div
                  className={styles['content-card-right']}
                >{childNav.title}
                </div>
              </Card>
            </Col>);
        });
        rows.push(
          <Row style={{ marginBottom: 16 }} type="flex" justify="start" gutter={16}>
            {temp}
          </Row>
        );
      });
      return (
        <div>
          { rows}
        </div>
      );
    } else {
      return (
        <div>
          <Spin size="large" />
        </div>
      );
    }
  };
  changeLayoutSiderState = (menuName, subMenuName) => {
    this.props.dispatch({
      type: 'global/changeLayoutSiderState',
      siderwidth: 100,
      siderimgwidth: 32,
      collapsed: true,
    });
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: true,
    });
    this.props.dispatch({
      type: 'kdMainControl/enterOrder',
    });
    this.props.dispatch({
      type: 'menu/getSubModuleMeuns',
      menuName,
      subMenuName,
    });
  };
  render() {
    return (
      <div>
        {this.getContent()}
      </div>
    );
  }
}
