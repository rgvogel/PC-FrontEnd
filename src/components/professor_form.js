import React from 'react';

class ProfessorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      subject: "",
      id: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
    this.props.onSubmit({
      fname: this.state.fname,
      lname: this.state.lname,
      subject: this.state.subject,
      id: this.state.id,
    });
    event.preventDefault();
  }

  handleCancel(event)
  {
    this.props.onCancel("new", {fname:"", lname:"", subject:""});
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.professor != null) {
      this.setState({
        fname: newProps.professor.fname,
        lname: newProps.professor.lname,
        subject: newProps.professor.subject,
        id: newProps.professor.id,
      });
    }
  }
  renderButtons() {
    if (this.props.formMode === "new") {
      return(
        <button type="submit" className="btn btn-primary">Create</button>
      );
    } else {
      return(
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="professor-form">
        <h1> Professors </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" autoComplete='given-name' name="fname" id=
              "fname" placeholder="First Name" value={this.state.fname} onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input type="text" className="form-control" autoComplete='family-name' name="lname" id
                ="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="subject" className="form-control" autoComplete='subject' name="subject" id="em
                  ail" placeholder="General subject professor teaches" value={this.state.subject} onChange={this.handleInputChange}/>
                </div>
                {this.renderButtons()}
              </form>
            </div>
          );
        }
      }

      export default ProfessorForm;
