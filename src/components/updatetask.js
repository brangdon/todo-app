import React from 'react'

export class UpdateTask extends React.Component {
    constructor() {
        super();
        this.justUpdated = this.justUpdated.bind(this);
    }

    justUpdated(event) {
        event.preventDefault();

        var input = event.target.querySelector('input');
        var value = input.value;
        input.value = '';
        this.props.updateList(value);
    }


    render() {
        return (
            <form onSubmit={this.justUpdated}>
                <input type="text"/>
            </form>
        );
    }
}