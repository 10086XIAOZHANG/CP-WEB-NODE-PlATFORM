/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Checkbox, Row, Col, Button, Collapse, Radio } from 'antd';
import LzEditor from '../../../modules/editor';
import styles from './styles.less';

class BlogContainerEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: '## HEAD 2 \n markdown examples \n ``` welcome ```',
    };
  }
  onChange=(checkedValues) => {
    console.log('checked = ', checkedValues);
  }
  receiveMarkdown=(content) => {
    console.log('recieved markdown content in', content);
  }
  render() {
    return (
      <div className={styles['blog-editor']}>
        <LzEditor
          active
          importContent={this.state.markdownContent}
          cbReceiver={this.receiveMarkdown}
          image={false}
          video={false}
          audio={false}
          convertFormat="markdown"
        />
        <div className={styles['blog-setting']}>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel header="网站分类" key="1">
              <div>
                <span>编程语言：</span>
                <Radio.RadioGroup name="radiogroup" defaultValue={1}>
                  <Radio value={1}>c#</Radio>
                  <Radio value={2}>.net</Radio>
                  <Radio value={3}>asp.net</Radio>
                  <Radio value={4}>python</Radio>
                  <Radio value={4}>c++</Radio>
                </Radio.RadioGroup>
              </div>
            </Collapse.Panel>
            <Collapse.Panel header="发布选项" key="2">
              <Checkbox.Group onChange={this.onChange}>
                <Row>
                  <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                  <Col span={8}><Checkbox value="B">B</Checkbox></Col>
                  <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                  <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                  <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            </Collapse.Panel>
            <Collapse.Panel header="高级选项" key="3">
              <Row>
                <Col span={17} />
                <Col span={3}><Button type="primary">存为草稿</Button></Col>
                <Col span={2}><Button type="primary">发布</Button></Col>
                <Col span={2}><Button >取消</Button></Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default BlogContainerEditorCell;
