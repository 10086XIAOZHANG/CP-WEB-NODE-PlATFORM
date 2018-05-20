/**
 *创建时间:  2018/5/20
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:
 */
import React from 'react';
import RegisterContainer from '../../containers/Register';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <RegisterContainer />
      </div>
    );
  }
}

export default Register;
