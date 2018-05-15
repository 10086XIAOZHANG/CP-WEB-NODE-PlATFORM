/**
 *创建时间:  2018/5/3
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Row, Col } from 'antd';
import styles from './style.less';

class KdTableStatus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles['table-status']}>
        <Row type="flex" justify="start" gutter={1}>
          <Col span={2}><div className={styles['table-display-inline']}>未审核</div><div className={styles['table-status-black']} /></Col>
          <Col span={2}><div className={styles['table-display-inline']}>未完全发货</div><div className={styles['table-status-black']} style={{ background: '#cfe0f8' }} /></Col>
          <Col span={2}><div className={styles['table-display-inline']}>未完全出库</div><div className={styles['table-status-black']} style={{ background: '#fff' }} /></Col>
          <Col span={2}><div className={styles['table-display-inline']}>未完全开票</div><div className={styles['table-status-black']} style={{ background: '#fff' }} /></Col>
          <Col span={2}><div className={styles['table-display-inline']}>未完全收款</div><div className={styles['table-status-black']} style={{ background: '#fff' }} /></Col>
          <Col span={2}><div className={styles['table-display-inline']}>完全收款</div><div className={styles['table-status-black']} style={{ background: '#fff' }} /></Col>
        </Row>
      </div>
    );
  }
}

export default KdTableStatus;

