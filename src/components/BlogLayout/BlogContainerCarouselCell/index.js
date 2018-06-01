/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Carousel, Row, Col } from 'antd';
import { Link } from 'dva/router';
import styles from './style.less';

class BlogContainerCarouselCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
    };
    const carouselFirst = this.props.carousel_data.length > 0 ?
      this.props.carousel_data.filter((item) => {
        return item.index === 1;
      }) : '';
    const carouselSecend = this.props.carousel_data.length > 0 ?
      this.props.carousel_data.filter((item) => {
        return item.index === 2;
      }) : '';
    const carouselThird = this.props.carousel_data.length > 0 ?
      this.props.carousel_data.filter((item) => {
        return item.index === 3;
      }) : '';
    const carouselFour = this.props.carousel_data.length > 0 ?
      this.props.carousel_data.filter((item) => {
        return item.index === 4;
      }) : '';
    const carouselCell = ((carousel) => {
      return (
        <div className={styles.fillview}>
          <div className={styles.leftContainer}>
            <Link to={{ pathname: 'blog/acticle_detail', state: { article_id: carousel[0].article.id } }}><img alt="" className={styles.fillview} src={carousel[0].image} /></Link>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.h160}>
              <Link to={{ pathname: 'blog/acticle_detail', state: { article_id: carousel[1].article.id } }}><img alt="" className={`${styles.fillview} ${styles.h160}`} src={carousel[1].image} /></Link>
            </div>
            <div className={styles.h160}>
              <Link to={{ pathname: 'blog/acticle_detail', state: { article_id: carousel[2].article.id } }}><img alt="" className={`${styles.fillview} ${styles.h160}`} src={carousel[2].image} /></Link>
            </div>
          </div>
        </div>);
    });
    return (
      <div>
        <Row>
          <Col span={24} className={styles['blog-carouselcontainer']}>
            <div className={styles.carousel}>
              {this.props.carousel_data.length > 0 ?
                <Carousel {...settings}>
                  {carouselCell(carouselFirst)}
                  {carouselCell(carouselSecend)}
                  {carouselCell(carouselThird)}
                  {carouselCell(carouselFour)}
                </Carousel> : ''}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogContainerCarouselCell;

