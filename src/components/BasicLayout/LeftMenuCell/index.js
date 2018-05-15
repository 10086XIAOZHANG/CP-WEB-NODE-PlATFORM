/* eslint-disable no-useless-constructor,import/no-dynamic-require,
jsx-a11y/mouse-events-have-key-events */
/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import classNames from 'classnames';
import styles from './style.less';

class LeftMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuTitle: this.props.menuTitle,
      imgUrl: this.props.imgUrl,
      activeImgColor: this.props.activeImgColor,
      defaultImgColor: this.props.defaultImgColor,
      isHovered: false,
      bgColor: '#333',
      titleTextColor: this.props.titleTextColor,
    };
  }
  over= () => {
    this.setState({
      isHovered: true,
    });
  }
  out=() => {
    this.setState({
      isHovered: false,
    });
  }
  svgOnInjected=(svg) => {
    console.log('svg.getElementsByTagName', typeof svg.getElementsByTagName);
    if (svg && typeof svg.getElementsByTagName === 'function') {
      if (this.state.isHovered) {
        this.setState({
          titleTextColor: this.state.activeImgColor,
        });
        for (const tag of svg.getElementsByTagName('path')) {
          tag.setAttribute('fill', this.state.activeImgColor);
        }
      } else {
        this.setState({
          titleTextColor: '#7A849D',
        });
        for (const tag of svg.getElementsByTagName('path')) {
          tag.setAttribute('fill', this.state.defaultImgColor);
        }
      }
    } else {
      console.log('请刷新浏览器');
    }
  }
  render() {
    const svgImgClass = classNames({
      'left-menu-svg-img-out': !this.state.isHovered,
      'left-menu-svg-img-over___2Tx5D': this.state.isHovered,
    });
    return (
      <div className={styles['left-menu-cell']} onMouseOver={this.over} onMouseOut={this.out}>
        <Card style={{ width: '100%', backgroundColor: this.state.bgColor }} bodyStyle={{ padding: 0 }} bordered={false}>
          <div className={styles['left-menu-img']}>
            <ReactSVG
              path={this.state.imgUrl}
              evalScripts="once"
              svgClassName={svgImgClass}
              svgStyle={{ height: this.props.siderImgWidth,
                width: this.props.siderImgWidth }}
              onInjected={(svg) => { this.svgOnInjected(svg); }}
            />
          </div>
          <div className={styles['let-menu-title']}>
            <p style={{ color: this.state.titleTextColor }}>{this.state.menuTitle}</p>
          </div>
        </Card>
      </div>
    );
  }
}
LeftMenu.propTypes = {
  activeImgColor: PropTypes.string,
  defaultImgColor: PropTypes.string,
  menuTitle: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  titleTextColor: PropTypes.string,

};
LeftMenu.defaultProps = {
  defaultImgColor: '#d5d5d5',
  activeImgColor: '#2DC0D6',
  titleTextColor: '#7A849D',
};
export default LeftMenu;
