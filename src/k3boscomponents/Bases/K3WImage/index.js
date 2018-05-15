import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class K3WImage extends PureComponent {
  render() {
    const { src, ...superProps } = this.props;
    return (
      <image src={src} {...superProps} />
    );
  }
}

K3WImage.propTypes = {
  src: PropTypes.string.isRequired,
};
export default K3WImage;
