import React from 'react';
import ReactDOM from 'react-dom';
import {Todo} from './components/main'

function getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today
}

var taskList = []

var tasks = localStorage.getItem('storedTasks');
// localStorage.clear()


if (tasks) {
    taskList = JSON.parse(tasks);
}


ReactDOM.render(
    <Todo tasks={taskList}/>,
    document.getElementById('root')
);
