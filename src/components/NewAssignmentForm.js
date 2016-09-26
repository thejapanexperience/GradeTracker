 import React, { Component } from 'react';
 import uuid from 'uuid';
 import GradeActions from '../actions/GradeActions';

 export default class newAssignment extends Component {

  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const { newAssignment, newScore } = this.refs;

    let assignment = {
      name: newAssignment.value,
      score: parseFloat(newScore.value),
      grade: "",
      id: uuid()
    }

    let totals = {
      totalScore: "",
      totalPossible: "",
      averageGrade: "",
    }

    newAssignment.value = '';
    newScore.value = '';
    newAssignment.focus();

    GradeActions.create(assignment);
  }

  render () {
    return (
      <form onSubmit={this._submitForm} className="form-inline">
        <div className="form-group">
          <label htmlFor="newAssignment">New Assignment:</label>
          <input ref='newAssignment' type="text" className="form-control" id='newAssignment' defaultValue="Flux Grade Tracker" required/>
        </div>
        <div className="form-group">
          <label htmlFor="newScore">Score:</label>
          <input ref='newScore' type="number" className="form-control" id='newScore' required min='0' step='0' defaultValue="99"/>
        </div>
        <button className="btn btn-success">Add Assignment</button>
      </form>
      )
  }
 }