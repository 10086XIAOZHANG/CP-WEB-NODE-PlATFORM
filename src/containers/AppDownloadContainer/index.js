/**
 *创建时间:  2018/6/26
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Footer from '../../components/BasicLayout/Footer';
import BaiduShare from '../../components/Bases/BaiduShare';
import styles from './style.less';

class AppDownloadContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  downLoadAndroidApp=() => {
    window.location.href = 'http://www.jimck.cn:8000/media/message/files/app-release.apk';
  }
  render() {
    const carouselInstance = (
      <div className={styles.carousel}>
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require('../../assets/appdownpage/carousel/sider.png')} />
            <Carousel.Caption>
              <h3>侧边栏</h3>
              <p>轻松设置夜间模式，快速打卡.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require('../../assets/appdownpage/carousel/theme.png')} />
            <Carousel.Caption>
              <h3>多彩主题</h3>
              <p>轻松更换APP背景.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require('../../assets/appdownpage/carousel/about_author.png')} />
            <Carousel.Caption>
              <h3>关于作者</h3>
              <p>了解作者生活的每一段色彩.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
    return (
      <div className={styles['app-down-container']}>
        <header>
          <div className="container" style={{ maxWidth: 1130, height: 75 }}>
            <div className={styles.logo} style={{ position: 'absolute' }}>
              <img src={require('../../assets/bases/logo.png')} style={{ height: 48, width: 140 }} alt="" title="" />
            </div>


            <nav className={styles['pull-left']} style={{ position: 'absolute', left: 320, top: 12 }}>
              <ul className="list-unstyled">
                <li className="animated wow fadeInLeft" data-wow-delay="0s"><a href="/">首页</a></li>
                <li className="animated wow fadeInLeft" data-wow-delay="0s"><a href="/blog">博客</a></li>
              </ul>
            </nav>

            <span className={styles.burger_icon}>menu</span>
          </div>
        </header>


        <section className={styles.hero} id="hero">
          <div className="container" style={{ maxWidth: 1130 }}>
            <div className="caption">
              <h1 className="text-uppercase  animated wow fadeInLeft">CP聚合博客 APP.</h1>
              <p className="text-lowercase  animated wow fadeInLeft">基于React Native支持Android和iOS双平台.</p>

              <a href="http://pixelhint.com/capture-free-responsive-bootstrap-app-landing-page-theme" className={styles.app_store_btn}>
                <i className={styles.iphone_icon} />
                <span>Iphone App</span>
              </a>

              <a onClick={this.downLoadAndroidApp} className={styles.app_store_btn}>
                <i className={styles.android_icon} />
                <span>Android App</span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.about} id="about">
          <div className="container" style={{ maxWidth: 1130 }}>
            <div className="row">
              <div className="col-md-6 text-center animated wow fadeInLeft">
                <div className="iphone">
                  <img src={require('../../assets/appdownpage/main_show_img.PNG')} alt="" titl="" />
                </div>
              </div>
              <div className="col-md-6 animated wow fadeInRight">
                <div className={styles.features_list}>
                  <h1 className="text-uppercase">APP 独特基因.</h1>
                  <p>精彩生活，记录生活的每一个瞬间
                  </p>
                  <ul className="list-unstyled">
                    <li className={styles.camera_icon}>
                      <span>支持订阅 50 多种编程语言.</span>
                    </li>
                    <li className={styles.video_icon}>
                      <span>支持收藏喜欢的项目.</span>
                    </li>
                    <li className={styles.eye_icon}>
                      <span>支持多种颜色主题自由切换.</span>
                    </li>
                    <li className={styles.pic_icon}>
                      <span>支持搜索,并自持自定义订阅关键字.</span>
                    </li>
                    <li className={styles.loc_icon}>
                      <span>通过app去查看个人最新博客和最热博客资讯.</span>
                    </li>
                  </ul>

                  <a href="#" className={styles.app_store_btn} id="play_video" data-video="http://www.youtube.com/embed/Bm3NV3gGB2w?autoplay=1&showinfo=0">
                    <i className={styles.play_icon} />
                    <span>About Video</span>
                  </a>
                  <a href="#hero" className={styles.app_link}>Get the app</a>
                </div>
              </div>
            </div>
          </div>

          <div className="about_video show_video">
            <p href="" className="close_video" />
          </div>
        </section>

        <section className={styles.app_features} id="app_features">
          <div className="container" style={{ maxWidth: 1130 }}>

            <div className="row text-center" />
            {carouselInstance}
          </div>
        </section>
        <footer>
          <Footer />
          <BaiduShare />
        </footer>
      </div>
    );
  }
}

export default AppDownloadContainer;
