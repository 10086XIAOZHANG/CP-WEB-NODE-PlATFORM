/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Slider, Input, Icon, Button } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import styles from './style.less';
// import { getBase64Image } from '../../../utils/utils';

class AvatarEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      originImg: this.props.avatar,
      scale: 1,
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
  completeEditorAvatar=() => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      canvasScaled.toBlob((file) => {
        this.props.completeEditorAvatar(file);
      });
    }
  }
  render() {
    return (
      <div className={styles['avatar-editor-cell']}>
        <AvatarEditor
          ref={(editor) => { this.editor = editor; }}
          image={this.state.originImg}
          width={200}
          height={200}
          border={50}
          color={[248, 249, 250, 0.8]}
          borderRadius={200}
          scale={parseFloat(this.state.scale)}
          style={{ cursor: 'move' }}
        />
        <Slider
          className={styles['avatar-editor-slider']}
          onChange={this.handleScale}
          min={1}
          max={2}
          step={0.01}
          value={this.state.scale}
          style={{ width: 290 }}
        />
        <div className={styles['avatar-buttom']}>
          <div className={styles['avatar-upload-input']}>
            <Input type="file" prefix={<Icon type="upload" />} ref={(input) => { this.file = input; }} onChange={this.onAvatarUpload} />
          </div>
          <Button style={{ float: 'right' }} type="primary" ghost onClick={this.completeEditorAvatar}>确认修改</Button>
        </div>
      </div>
    );
  }
}

export default AvatarEditorCell;
