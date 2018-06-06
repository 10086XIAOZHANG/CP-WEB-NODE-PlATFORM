/**
 *创建时间:  2018/6/6
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */

import React from 'react';
import marked from 'marked';
import SimpleMDE from 'simplemde';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';

class MarkDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.smde.obj = new SimpleMDE({
      element: this.areaInput.childElementCount,
      autofocus: true,
      autosave: true,
      previewRender(plainText) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight(code) {
            return highlight.highlightAuto(code).value;
          },
        });
      },
    });
  }
  onMarkDownChange =() => {
    this.props.onMarkDownChange(this.smde.value());
  }
  render() {
    return (
      <div style={{ display: this.props.editorsStatus ? 'none' : 'block' }} >
        <textarea ref={(text) => { this.areaInput = text; }} onChange={this.onMarkDownChange} />
      </div>
    );
  }
}

export default MarkDown;
