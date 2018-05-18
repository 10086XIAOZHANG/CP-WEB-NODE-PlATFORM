/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Carousel, Row, Col } from 'antd';
import Config from '../../../common/config';
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
    return (
      <div>
        <Row>
          <Col span={24} className={styles['blog-carouselcontainer']}>
            <div className={styles.carousel}>
              <Carousel {...settings}>
                <div className={styles.fillview}>
                  <div className={styles.leftContainer}>
                    <img alt="" className={styles.fillview} src={`${Config.default.defaultProps.resource_server}/ContainerCarousel/images/carousel_1.jpg`} />
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_1_1.jpg`} />
                    </div>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_1_2.jpg`} />
                    </div>
                  </div>
                </div>
                <div className={styles.fillview}>
                  <div className={styles.leftContainer}>
                    <img alt="" className={styles.fillview} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_2.jpg`} />
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_2_1.jpg`} />
                    </div>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_2_2.jpg`} />
                    </div>
                  </div>
                </div>
                <div className={styles.fillview}>
                  <div className={styles.leftContainer}>
                    <img alt="" className={styles.fillview} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_3.jpg`} />
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_3_1.jpg`} />
                    </div>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_3_2.jpg`} />
                    </div>
                  </div>
                </div>
                <div className={styles.fillview}>
                  <div className={styles.leftContainer}>
                    <img alt="" className={styles.fillview} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_4.jpg`} />
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_4_1.jpg`} />
                    </div>
                    <div className={styles.h160}>
                      <img alt="" className={`${styles.fillview} ${styles.h160}`} src={`${Config.default.defaultProps.resource_server}/components/ContainerCarousel/images/carousel_4_2.jpg`} />
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogContainerCarouselCell;

