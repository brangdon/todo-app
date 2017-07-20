import React from 'react'
var DatePicker = require("react-bootstrap-date-picker");

export class AddNewTask extends React.Component {
    constructor() {
        super();
        this.justSubmitted = this.justSubmitted.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        var currentDate = new Date().toISOString();
        this.state = {
            name: '',
            description: '',
            dateValue: currentDate
        }
    }

    justSubmitted(event) {
        event.preventDefault();

        var input = event.target.querySelector('input');
        var value = input.value;
        input.value = '';


        let task = {
            name: value,
            description: this.state.description,
            finish_date: this.state.dateValue,
            priority: 0
        }

        this.setState({
            name: '',
            description: ''
        })

        this.props.updateList(task);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeDate(value) {
        this.setState({
            dateValue: value
        });
        console.log(value.substring(0, 10).replace('-', '/').replace('-', '/'))
    }


    render() {
        return (
            <div className="add-task">
                <form onSubmit={this.justSubmitted}>
                    <div className="form-group">
                        <label for="inputName">Task name</label>
                        <input id="inputName" className="form-control" onChange={this.handleChangeName} type="text"
                               placeholder="Name"/>
                    </div>
                    <div className="form-group">
                        <label for="inputDescription">Task description</label>
                        <textarea id="inputDescription" className="form-control" rows="5" value={this.state.description}
                                  onChange={this.handleChangeDescription} placeholder="Description"/>
                    </div>
                    <DatePicker id="example-datepicker" value={this.state.dateValue} onChange={this.handleChangeDate}/>
                    <button className="btn btn-default" type="submit">Add task</button>
                </form>

            </div>

        );
    }
}