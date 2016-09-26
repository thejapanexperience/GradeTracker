import React, { Component } from 'react';
import numeral from 'numeral';
import GradeActions from '../actions/GradeActions';
import GradeStore from '../stores/GradeStore';

export default class AssignmentTableTotals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: GradeStore.getTotals()
    }
    this._onChange = this._onChange.bind(this);

    }
    componentWillMount() {
      GradeStore.startListening(this._onChange)
    }
  
    componentWillUnmount() {
      GradeStore.stopListening(this._onChange)
    }
  
    _onChange() {
      this.setState ({totals: GradeStore.getTotals()})
    }

  render() {

    const { totals } = this.state;
    const { assignments } = this.props;

    let score = 0;

     for (var i = 0; i < assignments.length; i++) {
       score = assignments[i].score + score
     }
     console.log(score)
     totals.totalScore = parseInt(score)
     totals.totalPossible = 100 * (assignments.length)
     
     let averageScore = totals.totalScore / totals.totalPossible * 100
     let averageGrade = ""
     if (averageScore >= 90) {
       averageGrade = "A"
     } else if (averageScore < 90 && averageScore >= 80) {
       averageGrade = "B"
     } else if (averageScore < 80 && averageScore >= 70) {
       averageGrade = "C"
     } else if (averageScore < 70 && averageScore >= 60) {
       averageGrade = "D"
     } else if (averageScore < 60) {
       averageGrade = "F"
     }
     totals.averageGrade = averageGrade;

    console.log (totals)

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Total Score</th>
            <th>Total Possible Score</th>
            <th>Average Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totals.totalScore}</td>
            <td>{totals.totalPossible}</td>
            <td>{totals.averageGrade}</td>
          </tr>
        </tbody>
      </table>
      )
  }
}