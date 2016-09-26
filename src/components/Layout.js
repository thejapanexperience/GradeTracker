 import React, { Component } from 'react';
 import NewAssignmentForm from './NewAssignmentForm';
 import AssignmentsContainer from './AssignmentsContainer'

 export default class Layout extends Component {
  render() { 
    return (
      <div className="container">
        <h1 className="">Flux Grade Tracker</h1>

        <NewAssignmentForm /> 
        <AssignmentsContainer />

      </div>)
  }
 }