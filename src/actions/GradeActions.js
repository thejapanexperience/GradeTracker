import AppDispatcher from '../AppDispatcher';

const GradeActions = {
  
  create(assignment) {
    AppDispatcher.dispatch({
      type: 'ASSIGNMENT_CREATE',
      payload: { assignment }
    })
  },

  edit(assignment){
    AppDispatcher.dispatch({
      type:'ASSIGNMENT_EDIT',
      payload: {assignment}
    })
  },

  totals(totals){
    AppDispatcher.dispatch({
      type:'TOTALS',
      payload: {}
    })
  }

}

export default GradeActions;
