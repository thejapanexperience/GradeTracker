import React, { Component } from 'react';
import GradeActions from '../actions/GradeActions';


export default class AssignmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: null
    }
    this._startEdit = this._startEdit.bind(this)
    this._stopEdit = this._stopEdit.bind(this)
    this._saveEdit = this._saveEdit.bind(this)
  }

  _startEdit(editId) {
    this.setState({ editId });
  }

  _stopEdit() {
    let editId = null;
    this.setState({ editId })
  }

  _saveEdit(assignment) {
    let { name, score } = this.refs;

    let newObject = Object.assign({}, assignment, {
      name: name.value,
      score: parseFloat(score.value)
    });

    console.log(newObject) /*<----------FLUXIFY*/
    GradeActions.edit(newObject);

    this._stopEdit(); 
  }

  render() {
    const { assignments } = this.props;
    const { editId } = this.state;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Score</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => {
            let { id, name, score, grade } = assignment;

            if(id === editId) {
              return (
                <tr key={id}>
                  <td>
                    <input type="text" ref="name" defaultValue={name}/>
                  </td>
                  <td>
                    <input type="number" ref="score" defaultValue={score} min="0" step="0" />
                  </td>
                  <td><button onClick={this._saveEdit.bind(this, assignment)}>Save</button>
                  <button onClick={this._stopEdit} >Cancel</button>
                  </td>
                </tr>
                )
            } else {
              return(
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{score}</td>
                    <td>{grade}</td>
                    <td>
                    </td>
                  </tr>
                )
            }
          })}
        </tbody>
      </table>
      )
  }
}