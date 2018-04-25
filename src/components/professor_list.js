import React from 'react';
import { Link } from 'react-router-dom'

const ProfessorListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.fname}</td>
      <td className="col-md-3">{props.lname}</td>
      <td className="col-md-3">{props.subject}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/professors/${props.id}/comments`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-list"></i> Comments
        </button>
      </Link>
        <button className="btn btn-secondary" onClick={event => props.onEdit("edit",props)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

const ProfessorList = (props) => {
  const professorItems = props.professors.map((professor)  => {
    return (
      <ProfessorListItem
        fname={professor.fname}
        lname={professor.lname}
        subject={professor.subject}
        id={professor.id}
        key={professor.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="professor-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Subject</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {professorItems}
        </tbody>
      </table>
    </div>
  );
}

export default ProfessorList;
