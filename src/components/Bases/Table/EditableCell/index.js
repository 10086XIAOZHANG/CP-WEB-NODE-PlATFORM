/**
 *创建时间:  2018/4/18
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import { Input, Icon } from 'antd';
import styles from './style.less';

class EditableCell extends React.PureComponent {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const values = e.target.value;
    this.setState({ value: values });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={styles['editable-cell']}>
        {
          editable ?
            <div className={styles['editable-cell-input-wrapper']}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={styles['editable-cell-icon-check']}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles['editable-cell-text-wrapper']}>
              {value || ' '}
              <Icon
                type="edit"
                className={styles['editable-cell-icon']}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export default EditableCell;
