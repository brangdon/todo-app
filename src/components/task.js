import React from 'react'
import {TwitterButton} from "react-social";

var DatePicker = require("react-bootstrap-date-picker");


export class Task extends React.Component {
    constructor(props) {
        super();
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.plus_priority = this.plus_priority.bind(this);
        this.minus_priority = this.minus_priority.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.state = {
            task: props.task,
            id: props.id,
            name: '',
            description: '',
            visible: false,
            dateValue: props.finish_date
        };
    }

    onClick() {
        this.setState({visible: !this.state.visible});
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeTextArea(event) {
        this.setState({description: event.target.value});
    }

    handleChangeDate(value) {
        this.setState({
            dateValue: value
        });
    }

    remove() {
        this.props.remove(this.state.id);
    }

    plus_priority() {
        this.props.plus_priority(this.state.id)
    }

    minus_priority() {
        this.props.minus_priority(this.state.id)
    }

    update() {
        if (this.state.name) {
            this.props.update(this.state.id, this.state.name, this.state.description, this.state.dateValue);
            this.setState(
                {
                    name: '',
                    description: this.state.description
                });
        }
    }

    formatDate(date) {
        return date.substring(0, 10).replace('-', '/').replace('-', '/')
    }

    prepareMessage() {
        let message = 'Name: ' + this.props.task.name + '\nDescription: ' + this.props.task.description + '\nFinish date: ' + this.formatDate(this.props.task.finish_date)
        return message
    }

    render() {
        let url = '';

        return (<div className="task">
                <div className="task-header">
                    <h3 className="task_header">{this.props.task.name}</h3>
                    <p>{this.props.task.description}</p>
                    <p>Priority: {this.props.task.priority}</p>
                    <p>Created: {this.formatDate(this.props.task.finish_date)}<br/></p>
                    <button className="btn btn-default" onClick={this.remove}>Delete task</button>
                    {
                        this.state.visible ?
                            <button type="button" className="btn btn-default pull-right" onClick={() => this.onClick()}>
                                Hide
                                details
                            </button> :
                            <button type="button" className="btn btn-default pull-right" onClick={() => this.onClick()}>
                                Show
                                details
                            </button>
                    }
                </div>

                <div className="accordion">
                    {
                        this.state.visible
                            ? <div className="task-details">

                            <div className="priorioty">

                                <button className="btn btn-default" onClick={this.plus_priority}>More priority</button>
                                <button className="btn btn-default" onClick={this.minus_priority}>Less priority</button>
                            </div>
                            <br/>
                            <div className="form-group ">

                                <label for="inputName">Change name</label>
                                <input id="inputName" className="form-control " placeholder="Change name"
                                       value={this.state.name}
                                       onChange={this.handleChangeName} type="text"/><br/>
                            </div>
                            <div className="form-group">
                                <label for="inputDescription">Change description</label>
                                <textarea id="inputDescription" className="form-control" rows="5"
                                          value={this.state.description}
                                          onChange={this.handleChangeTextArea}></textarea>
                            </div>
                            <div className="form-group">
                                <DatePicker id="example-datepicker" value={this.state.dateValue}
                                            onChange={this.handleChangeDate}/>
                            </div>

                            <button className="btn btn-default pull-right" onClick={ this.update}>Update task</button>

                            <p>Share on Twitter! <TwitterButton title="Share via Twitter" url={url}
                                                                message={this.prepareMessage()}
                                                                element="a" className="tt">
                                <i className="fa fa-twitter-square"/>
                            </TwitterButton>
                            </p>
                        </div>
                            : null
                    }

                </div>
            </div>
        );
    }
}