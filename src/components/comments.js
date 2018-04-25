import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const API_BASE = 'https://prof-com.herokuapp.com/';
const CommentItem = (props) => {
  return (
    <tr>
      <td className="col-md-3">{props.title}</td>
      <td className="col-md-3">{props.student}</td>
      <td className="col-md-3">{props.message}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/professors/${props.professor_id}/comments/${props.id}`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
      </Link>
      <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
        <i className="glyphicon glyphicon-remove"></i> Delete
      </button>
    </td>
  </tr>
);
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      comments: [],
      professor_id: id,
      professor: {}
    };
    this.loadComments = this.loadComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }
  loadComments() {
    axios
    .get(`${API_BASE}/professors/${this.state.professor_id}/comments`)
    .then(res => {
      this.setState({ comments: res.data });
      console.log(`Data loaded! = ${this.state.comments}`)
    })
    .catch(err => console.log(err));
    axios
    .get(`${API_BASE}/professors/${this.state.professor_id}`)
    .then(res => {
      this.setState({ professor: res.data });
      console.log(`Data loaded! = ${this.state.comments}`)
    })
    .catch(err => console.log(err));
  }
  deleteComment(id) {
    let filteredArray = this.state.comments.filter(item => item.id !== id)
    this.setState({comments: filteredArray});
    axios
    .delete(`${API_BASE}/professors/${this.state.professor_id}/comments/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }
  componentDidMount() {
    console.log('Comments mounted!')
    this.loadComments();
  }

  render() {
    const commentItems = this.state.comments.map((comment) => {
      return (
        <CommentItem
          title={comment.title}
          student={comment.student}
          message={comment.message}
          professor_id = {comment.professor_id}
          id={comment.id}
          key={comment.id}
          onDelete={this.deleteComment}
        />

      )
    });
    const headerString = (this.state.comments.count === 0)
    ? "Loading..." : `Comments About Dr. ${this.state.professor.lname}`
    return (
      <div className="comments">
        <h1> {headerString} </h1>
        <div className="professor-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Title</th>
                <th className="col-md-3">Student</th>
                <th className="col-md-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {commentItems}
            </tbody>
          </table>
          <Link to={`/professors/${this.state.professor_id}/comments/create`}>
          <button className="btn btn-success btn-sm">
            <i className="glyphicon glyphicon-plus"></i> Create
          </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
          <i className="glyphicon glyphicon-menu-left"></i> Back
        </button>
      </div>
    </div>
  );
}
}
export default Comments;
