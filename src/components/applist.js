import React from 'react';
import {Task} from './task'


export class ToDoAppList extends React.Component {
    constructor() {
        super();
        this.remove = this.remove.bind(this);
        this.updateName = this.updateName.bind(this);
        this.plus_priority = this.plus_priority.bind(this);
        this.minus_priority = this.minus_priority.bind(this);
    }

    remove(index) {
        this.props.remove(index);
    }

    updateName(index, name, description, date) {
        this.props.update(index, name, description, date);
    }

    plus_priority(index) {
        this.props.plus_priority(index);
    }

    minus_priority(index) {
        this.props.minus_priority(index);
    }


    render() {
        var items = this.props.tasks.map((elem, i) => {

            return <Task task={elem} description={elem.description} finish_date={elem.finish_date} key={i} id={i} update={this.updateName} remove={this.remove} plus_priority={this.plus_priority} minus_priority={this.minus_priority} />
        });
        return (
            <ul>
                {items}
            </ul>
        );
    }
}