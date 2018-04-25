import React from 'react';
import axios from 'axios';
const API_BASE = 'https://prof-com.herokuapp.com/';
class CommentForm extends React.Component {
  constructor(props) {
    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      title: "",
      student: "",
      message: "",
      professor_id: id,
      comment_id: createMode ? 0 : props.match.params.pid,
      createMode: createMode
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    // load the comment if are editing.
    if (!createMode) {
      axios
      .get(`${API_BASE}/professors/${this.state.professor_id}/comments/${this.state.comment_id}`)
      .then(res => {
        console.log("comment fetched")
        this.setState({
          title: res.data.title,
          message: res.data.message
        })
      })
      .catch(err => console.log(err));
    }
  }

  addComment(newComment) {
    axios
    .post(`${API_BASE}/professors/${newComment.professor_id}/comments`, newComment)
    .then(res => {
      //this.props.history.replace(`/professors/${this.state.professor_id}/comments`);
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  updateComment(comment) {
    axios
    .put(`${API_BASE}/professors/${comment.professor_id}/comments/${comment.comment_id}`, comment)
    .then(res => {
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    const comment = {
      title: this.state.title,
      message: this.state.message,
      professor_id: this.state.professor_id,
      comment_id: this.state.comment_id
    }
    if (this.state.createMode) {
      this.addComment(comment);
    } else {
      this.updateComment(comment);
    }
    event.preventDefault();
  }

  handleCancel(event)
  {
    console.log("canceled pressed.")
    this.props.history.goBack();
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.createMode ? "Create Comment" : "Edit Comment"}
        </h1>
        <div className="professor-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" name="title" id="title" placeholder="Enter title" value={this.state.title} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label>Student</label>
                <input type="text" className="form-control" name="stufent" id="title" placeholder="Enter your commentary" value={this.state.title} onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" name="message" id="message" value={this.state.message} onChange={this.handleInputChange} rows="6"></textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create"
                    : "Save"}</button>
                    <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }
}
export default CommentForm;
