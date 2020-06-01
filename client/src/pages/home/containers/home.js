import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBookList } from "../redux/actions/list";
import "../../../assets/home/home.less";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      page: 1, // 当前加载页
      size: 20, //每次请求条数
    };
    this.loadMore = this.loadMore.bind(this); // 加载更多
  }
  static fetch(store) {
    return store.dispatch(fetchBookList({ page: 1, size: 20 }));
  }
  componentDidCatch(error, info) {
    // 在这里可以做异常的上报
    console.log("发送错误" + error, info);
  }
  componentWillMount() {
    const { booklist } = this.props;
    let a = booklist;
    console.log(booklist);
    if (booklist.length === 0) {
      this.props.fetchBookList({
        page: this.state.page,
        size: this.state.size,
      });
    }
  }
  loadMore(no) {
    this.props.fetchBookList({ page: no, size: this.state.size });
    this.setState({ page: no });
  }
  render() {
    const props = this.props;
    let { list, pagination } = this.props;
    let { page } = this.state;
    return (
      <div className="home">
        <div className="title">首页</div>
        <BookList booklist={props.booklist}></BookList>
        <div className="btn-container">
          <a className="action" onClick={this.loadMore.bind(this, page + 1)}>
            加载更多...
          </a>
        </div>
      </div>
    );
  }
}
/**
 * 数据目录 组件
 * @param {*} param0
 */
const BookList = ({ booklist }) => {
  return (
    <div className="book-list">
      {booklist.map((item, index) => (
        <div className="book-list-item" key={"bookindex" + index}>
          <div>
            <Link className="name" to={`/book/${item.dbName}`}>
              {item.bookName}
            </Link>
          </div>
          <div className="detail">{item.bookDetail}</div>
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  booklist: state.booklist.list,
  pagination: state.booklist.pagination,
});
const mapDispatchToProps = {
  fetchBookList: fetchBookList,
};

Home.propTypes = {
  booklist: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
};
BookList.propTypes = {
  booklist: PropTypes.array.isRequired,
};

const exportHome = connect(mapStateToProps, mapDispatchToProps)(Home);
export default exportHome;
