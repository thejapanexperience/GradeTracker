import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import Storage from '../Storage';

let _assignments = Storage.read('assignments') || [];
let _totals = Storage.read('totals') || [];

class GradeStore extends EventEmitter {

  constructor() {
    super();

    AppDispatcher.register(action => {

      
      switch(action.type) {
        
        case 'ASSIGNMENT_CREATE':

        let { assignment } = action.payload;
        
        if (assignment.score >= 90) {
          assignment.grade = "A"
        } else if (assignment.score < 90 && assignment.score >= 80) {
          assignment.grade = "B"
        } else if (assignment.score < 80 && assignment.score >= 70) {
          assignment.grade = "C"
        } else if (assignment.score < 70 && assignment.score >= 60) {
          assignment.grade = "D"
        } else if (assignment.score < 60) {
          assignment.grade = "F"
        }

        _assignments.push(assignment);

        let score = 0;

        for (var i = 0; i < _assignments.length; i++) {
          score = _assignments[i].score + score
        }
        console.log(score)
        _totals.totalScore = parseInt(score)
        _totals.totalPossible = 100 * (_assignments.length)
        
        let averageScore = _totals.totalScore / _totals.totalPossible
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

        _totals.averageGrade = averageGrade;
        console.log('totals', _totals)

        this.emit('CHANGE')
        
        
        case 'ASSIGNMENT_EDIT':
        let id = assignment.id
        let index = _assignments.findIndex(x => x.id===id)        
        console.log('index of id :',index)

        if (assignment.score *100 >= 90) {
          assignment.grade = "A"
        } else if (assignment.score *100  < 90 && assignment.score *100 >= 80) {
          assignment.grade = "B"
        } else if (assignment.score *100 < 80 && assignment.score *100 >= 70) {
          assignment.grade = "C"
        } else if (assignment.score *100 < 70 && assignment.score *100 >= 60) {
          assignment.grade = "D"
        } else if (assignment.score *100 < 60) {
          assignment.grade = "F"
        }

        _assignments[index] = assignment;

        let score1 = 0;

        for (var j = 0; j < _assignments.length; j++) {
          score1 += _assignments[j].score
        }

        _totals.totalScore = score1
        _totals.totalPossible = 100 * (_assignments.length)
        
        let averageScore1 = _totals.totalScore / _totals.totalPossible
        let averageGrade1 = ""

        if (averageScore1 *100 >= 90) {
          averageGrade1 = "A"
        } else if (averageScore1 *100 < 90 && averageScore1 *100 >= 80) {
          averageGrade1 = "B"
        } else if (averageScore1 *100 < 80 && averageScore1 *100 >= 70) {
          averageGrade1 = "C"
        } else if (averageScore1 *100 < 70 && averageScore1 *100 >= 60) {
          averageGrade1 = "D"
        } else if (averageScore1 *100 < 60) {
          averageGrade1 = "F"
        }

        _totals.averageGrade = averageGrade1;

        this.emit('CHANGE')

      }

    });

    this.on('CHANGE',() => {
      Storage.write('assignments', _assignments),
      Storage.write('totals', _totals)
    });

  } 

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }

  getAll() {
    return _assignments;
  }

  getTotals() {
    return _totals;
  }
}

export default new GradeStore();