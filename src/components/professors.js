import React from 'react';
import ProfessorForm from './professor_form';
import ProfessorList from './professor_list';
import axios from 'axios';
const API_BASE = 'http://localhost:3000/';

class Professors extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      professors: [],
      formMode: "new",
      professor: {lname:"", fname:"", subject:""}
    };
    this.loadProfessors = this.loadProfessors.bind(this);
    this.removeProfessor = this.removeProfessor.bind(this);
    this.addProfessor = this.addProfessor.bind(this);
    this.updateProfessor = this.updateProfessor.bind(this);
  }

  updateForm(mode, professorVals) {
    this.setState({
      professor: Object.assign({}, professorVals),
      formMode: mode,
    });
  }

  clearForm()
  {
    console.log("clear form");
    this.updateForm("new",{fname:"",lname:"",subject:""});
  }

  formSubmitted(professor) {
    if(this.state.formMode === "new") {
      this.addProfessor(professor);
    } else {
      this.updateProfessor(professor);
    }
    this.clearForm();
  }

  loadProfessors() {
    //this.setState({
      axios
        .get(`${API_BASE}/professors`)
        .then(res => {
          this.setState({ professors: res.data });
          console.log(`Data loaded! = ${this.state.professors}`)
      })
      .catch(err => console.log(err));
  }

  addProfessor(newProfessor) {
    axios
    .post(`${API_BASE}/professors`, newProfessor)
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ professors: [...this.state.professors, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateProfessor(professor) {
    axios
    .put(`${API_BASE}/professors/${professor.id}`, professor)
    .then(res => {
      this.loadProfessors();
    })
    .catch(err => console.log(err));
  }

  removeProfessor(id) {
    let filteredArray = this.state.professors.filter(item => item.id !== id)
    this.setState({professors: filteredArray});
    axios
    .delete(`${API_BASE}/professors/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
      //this.clearForm();
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Professors just got mounted")
    this.loadProfessors();
  }

  render() {
    return (
      <div className="professors">
        <ProfessorForm
          onSubmit={(professor) => this.formSubmitted(professor)}
          onCancel={(mode,professor) => this.updateForm(mode,professor)}
          formMode={this.state.formMode}
          professor={this.state.professor}
        />
        <ProfessorList
          professors={this.state.professors}
          onDelete={(id) => this.removeProfessor(id)}
          onEdit={(mode,professor) => this.updateForm(mode,professor)}
        />
      </div>
    );
  }
}

export default Professors;
