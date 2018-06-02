/**
 *创建时间:  2018/5/19
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Card, Input, Button, Form, Icon } from 'antd';
import styles from './style.less';

const FormItem = Form.Item;

class LeaveMsgCommentEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.objInp = null;
    this.state = {
    };
  }
  onPublicMsg=() => {
    if (this.file.input.files && this.file.input.files.length > 0) {
      this.props.onPublicMsg(this.file.input.files[0]);
    }
  }
  publicMsg=() => {
    this.onPublicMsg();
  }
  uploadChange=(file, fileList) => {
    console.log(file, fileList);
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles['comment-editor']}>
        <Card bordered={false} style={{ width: '100%' }}>
          <Form>
            <p className={styles['comment-editor-p']}>我要留言</p>
            <FormItem
              {...formItemLayout}
              label="主题"
            >
              {getFieldDecorator('subject', {
                rules: [{ required: true, message: '请输入留言主题!' }],
              })(
                <Input placeholder="请输入留言主题" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="留言内容"
            >
              {getFieldDecorator('message', {
              rules: [{ required: true, message: '请输入留言内容!' }],
            })(
              <Input.TextArea
                rows={4}
                onPressEnter={this.onPublicMsg}
                ref={(input) => { this.objInp = input; }}
              />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="附件上传"
            >
              {getFieldDecorator('file', {
                rules: [{ required: false }],
              })(
                <Input type="file" prefix={<Icon type="upload" />} ref={(input) => { this.file = input; }} />
              )}
            </FormItem>
            <div className={styles['comment-editor-btn']}>
              <div style={{ float: 'right' }}><Button onClick={this.publicMsg} style={{ float: 'right' }} htmlType="submit" type="danger">发表留言</Button></div>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

export default LeaveMsgCommentEditorCell;
