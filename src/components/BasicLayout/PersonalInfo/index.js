/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Form, Select, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import styles from './styles.less';

const FormItem = Form.Item;
const { Option } = Select;

class PersonalInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onUserInfoSubmit= () => {
    this.props.onUserInfoSubmit();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object', required: false, message: '请输入出生日期!' }],
      initialValue: this.props.userInfo.birthday ? moment(this.props.userInfo.birthday) : '',
    };
    return (
      <div className={styles['personal-info']}>
        <h6 className={styles['form-title']}>个人信息</h6>
        <Form>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            label="姓名"
          >
            {getFieldDecorator('name', {
              rules: [{ required: false, message: '请输入你的姓名!' }],
              initialValue: this.props.userInfo.name,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            label="出生日期"
          >
            {getFieldDecorator('birthday', config)(
              <DatePicker />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            label="性别"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: false, message: '请选择性别!' }],
              initialValue: this.props.userInfo.gender,
            })(
              <Select
                placeholder="请选择性别"
                onChange={this.handleSelectChange}
              >
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            label="电子邮件地址"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '请输入有效的邮箱地址!',
              }, {
                required: false, message: '请输入你的邮箱地址!',
              }],
              initialValue: this.props.userInfo.email,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            label="手机号码"
          >
            {getFieldDecorator('mobile', {
              rules: [{ required: false, message: '请输入你的手机号码!' }],
              initialValue: this.props.userInfo.mobile,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit" onClick={this.onUserInfoSubmit}>
              确认修改
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default PersonalInfo;
