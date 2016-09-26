import React, { Component } from 'react';

import AssignmentTable from './AssignmentTable';
import AssignmentTableTotals from './AssignmentTableTotals';

import GradeStore from '../stores/GradeStore';

export default class AssignmentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: GradeStore.getAll(),
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
    this.setState ({
      assignments: GradeStore.getAll(),
      totals: GradeStore.getTotals()  
    })
  }

  render() {

    const { assignments, totals } = this.state;

    return(
    <div className="container">
    <AssignmentTable assignments={assignments} />
    <AssignmentTableTotals assignments={assignments} 
    />
    </div>
    )
  }
}