import React from 'react'
import {AddNewTask} from './addtask'
import {ToDoAppList} from './applist'
var sortBy = require('sort-by')

export class Todo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tasks: props.tasks,
            descPriority: true,
            descDate: false,
        };
        this.updateList = this.updateList.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.plus_priority = this.plus_priority.bind(this);
        this.minus_priority = this.minus_priority.bind(this);
        this.sortPriority = this.sortPriority.bind(this);
        this.sortDate = this.sortDate.bind(this);

    }

    updateList(task) {
        var updatedTasks = this.state.tasks;
        updatedTasks.unshift(task)
        this.setState({
            tasks: updatedTasks
        });
        this.updateLocalStorage(updatedTasks);
    }

    removeTask(index) {
        var updatedTasks = this.state.tasks;
        updatedTasks.splice(index, 1);
        this.setState({
            tasks: updatedTasks
        });
        this.updateLocalStorage(updatedTasks);
    }

    updateTask(index, name, description, date) {
        var updatedTasks = this.state.tasks;

        updatedTasks[index].name = name
        updatedTasks[index].description = description
        updatedTasks[index].finish_date = date
        this.setState({
            tasks: updatedTasks
        });
        this.updateLocalStorage(updatedTasks);
    }

    plus_priority(index) {
        var updatedTasks = this.state.tasks;

        updatedTasks[index].priority++;
        this.setState({
            tasks: updatedTasks
        });
        this.updateLocalStorage(updatedTasks);
    }

    minus_priority(index) {
        var updatedTasks = this.state.tasks;

        updatedTasks[index].priority--;
        this.setState({
            tasks: updatedTasks
        });
        this.updateLocalStorage(updatedTasks);
    }

    updateLocalStorage(updatedTasks) {
        localStorage.setItem('storedTasks', JSON.stringify(updatedTasks));
    }

    sortPriority() {
        var tasks = this.state.tasks;
        if (this.state.descPriority) {
            tasks.sort(sortBy('priority'));
            this.setState({
                tasks: tasks,
                descPriority: false
            });

        } else {
            tasks.sort(sortBy('-priority'));
            this.setState({
                tasks: tasks,
                descPriority: true
            });
        }

        this.updateLocalStorage(tasks);
    }

    sortDate() {
        var tasks = this.state.tasks;
        if (this.state.descDate) {
            tasks.sort(sortBy('finish_date'));
            this.setState({
                tasks: tasks,
                descDate: false
            });

        } else {
            tasks.sort(sortBy('-finish_date'));
            this.setState({
                tasks: tasks,
                descDate: true
            });
        }

        this.updateLocalStorage(tasks);
    }

    render() {
        return (
            <div>
                <h2 className="main_h2">ToDo App</h2>
                <AddNewTask updateList={this.updateList}/>
                <div className="sorting">
                    <button className="btn btn-default pull-right" onClick={this.sortPriority}>Sort by priority</button>
                    <button className="btn btn-default pull-right" onClick={this.sortDate}>Sort by date</button>
                </div>
                <ToDoAppList tasks={this.state.tasks} remove={this.removeTask} update={this.updateTask}
                             plus_priority={this.plus_priority} minus_priority={this.minus_priority}/>
            </div>
        );
    }
}