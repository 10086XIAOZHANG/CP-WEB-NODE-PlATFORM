/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Slider, Input, Icon } from 'antd';
import AvatarEditor from 'react-avatar-editor';
// import { getBase64Image } from '../../../utils/utils';

class AvatarEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      originImg: this.props.avatar,
      scale: 0,
    };
  }
  onAvatarUpload=() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgFile = e.target.result;
      this.setState({
        originImg: imgFile,
      });
    };
    reader.readAsDataURL(this.file.input.files[0]);
  }
  handleScale =(value) => {
    this.setState({
      scale: value,
    });
  }
  render() {
    return (
      <div>
        <AvatarEditor
          image={this.props.avatar || this.state.originImg}
          width={200}
          height={200}
          border={50}
          color={[248, 249, 250, 0.8]}
          borderRadius={200}
          scale={parseFloat(this.state.scale)}
          style={{ cursor: 'move', margin: '10px 0' }}
        />
        <Slider
          onChange={this.handleScale}
          min={1}
          max={2}
          step={0.01}
          value={this.state.scale}
          style={{ width: 290 }}
        />
        <Input type="file" prefix={<Icon type="upload" />} ref={(input) => { this.file = input; }} onChange={this.onAvatarUpload} />
      </div>
    );
  }
}

export default AvatarEditorCell;
