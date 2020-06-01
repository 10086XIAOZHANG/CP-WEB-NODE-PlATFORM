import React, { Component } from "react";

import { gql } from "apollo-boost";
import { withApollo } from "react-apollo";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      content: {},
    };
  }
  static fetch(client) {
    console.log("进入client query");
    return client.query({
      query: gql`
        {
          articleType(id: "8e0c7edf52232d4c1bb10a44bbfaa717") {
            id
            name
            remark
          }
        }
      `,
    });
  }
  componentDidMount() {
    if (this.props.client.store.cache.data.data) {
      this.setState({
        content: this.props.client.store.cache.data.data[
          "articleType:8e0c7edf52232d4c1bb10a44bbfaa717"
        ],
      });
    } else {
      this.props.client
        .query({
          query: gql`
            {
              articleType(id: "8e0c7edf52232d4c1bb10a44bbfaa717") {
                id
                name
                remark
              }
            }
          `,
        })
        .then((data) => {
          console.log(data);
        });
    }
  }
  componentDidCatch(error, info) {
    // 在这里可以做异常的上报
    console.log("发送错误" + error, info);
  }

  render() {
    return (
      <div className="home">
        <div className="title">acticle</div>
        <div>查询到的结果:</div>
        <ul>
          <li>id: {this.state.content.id}</li>
          <li>名字: {this.state.content.name}</li>
          <li>备注: {this.state.content.remark}</li>
        </ul>
      </div>
    );
  }
}
export default withApollo(Home);
