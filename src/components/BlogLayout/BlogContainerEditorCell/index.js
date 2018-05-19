/**
 *创建时间:  2018/5/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Collapse, Radio, Checkbox, Row, Col, Button } from 'antd';
import Editor from 'react-umeditor';
import styles from './styles.less';

class BlogContainerEditorCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // content: '',
    };
  }
  onChange=(checkedValues) => {
    console.log('checked = ', checkedValues);
  }
  getIcons=() => {
    const icons = [
      'source | undo redo | bold italic underline strikethrough fontborder emphasis | ',
      'paragraph fontfamily fontsize | superscript subscript | ',
      'forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ',
      'cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ',
      'horizontal date time  | image emotion spechars | inserttable',
    ];
    return icons;
  }
  getPlugins=() => {
    return {
      image: {
        uploader: {
          name: 'file',
          url: '/api/upload',
        },
      },
    };
  }
  handleChange=(content) => {
    console.log(content);
    this.setState({
      content,
    });
  }
  receiveMarkdown=(content) => {
    console.log('recieved markdown content in', content);
  }
  render() {
    const icons = this.getIcons();
    const plugins = this.getPlugins();
    return (
      <div className={styles['blog-editor']}>
        <Editor
          icons={icons}
          value={this.state.content}
          defaultValue=""
          onChange={this.handleChange}
          plugins={plugins}
        />
        <div className={styles['blog-setting']}>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel header="网站分类" key="1">
              <div>
                <span>编程语言：</span>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}>c#</Radio>
                  <Radio value={2}>.net</Radio>
                  <Radio value={3}>asp.net</Radio>
                  <Radio value={4}>python</Radio>
                  <Radio value={4}>c++</Radio>
                </Radio.Group>
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
