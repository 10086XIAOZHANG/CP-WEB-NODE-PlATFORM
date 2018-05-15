/**
 *创建时间:  2018/4/23
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: 方案选择
 */
import React from 'react';
import { Input, Button, Form } from 'antd';

class SchemeCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
    };
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
    } : null;
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            label="方案名称:"
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">确认</Button>
          </Form.Item>
          <Form.Item>
            <Button style={{ marginLeft: 8 }}>
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button style={{ marginLeft: 8 }}>
              保存方案
            </Button>
          </Form.Item>
          <Form.Item>
            <Button style={{ marginLeft: 8 }}>
              默认方案
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default SchemeCell;

