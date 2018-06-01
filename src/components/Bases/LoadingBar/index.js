/**
 *创建时间:  2018/5/9
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 顶部进度条
 */
import React from 'react';
import PropTypes from 'prop-types';

class LoadingBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.progress = 0;
    this.timer = {};
    this.state = {
      style: {
        display: 'none',
        position: 'absolute',
        zIndex: '100',
        width: '0%',
        height: '2px',
        backgroundColor: '#23aefa',
        transition: 'width 400ms ease-out, height 400ms linear',
      },
    };
  }

  componentDidMount() {
    console.log('nextProps.status', this.props.status);
    this.timer = setInterval(() => {
      if (this.progress <= (100 - this.props.step)) {
        this.setState({
          style: Object.assign({}, this.state.style, {
            width: `${this.progress += this.props.step}%`,
            display: 'block',
          }),
        });
      }
    }, this.props.speed);
  }
  componentWillUnmount() {
    this.closeLoading();
  }
  closeLoading=() => {
    console.log('componentWillUnmount,closeLoading');
    this.setState({
      style: Object.assign({}, this.state.style, {
        width: '100%',
      }),
    });
    setTimeout(() => {
      this.setState({
        style: Object.assign({}, this.state.style, {
          display: 'none',
        }),
      });
      console.log('this LoadingBar SetTimeout');
    }, 2000);
  }
  render() {
    return (
      <div>
        <div style={this.state.style} />
        <div style={{ display: 'table', clear: 'both' }} />
      </div>
    );
  }
}
LoadingBar.propTypes = {
  speed: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  status: PropTypes.bool,
};
LoadingBar.defaultProps = {
  status: true,
};

export default LoadingBar;
