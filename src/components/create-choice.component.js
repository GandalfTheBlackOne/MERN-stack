import React, { Component } from 'react';
import axios from 'axios';

export default class CreateChoice extends Component {
    constructor(props) {
        super(props);

        this.onChangeTGname = this.onChangeTGname.bind(this);
        this.onChangeChoice = this.onChangeChoice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            tgname: '',
            choice: '',
            tgnames: [],
            choices: []

        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/choices/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                      tgnames: response.data.map(tgname => tgname.tgname),
                      tgname: response.data[0].tgname,
                        choices: response.data.map(choice => choice.choice),
                        choice: response.data[0].choice
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeTGname(e) {
        this.setState({
            tgname: e.target.value
        })
    }

    onChangeChoice(e) {
        this.setState({
            choice: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const choice = {
            tgname: this.state.tgname,
            choice: this.state.choice
        }

        console.log(choice);

        axios.post('http://localhost:5000/choices/add', choice)
            .then(res => console.log(res.data));

        //window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Choices</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>TGname on text: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.tgname}
                            onChange={this.onChangeTGname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Choice: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.choice}
                            onChange={this.onChangeChoice}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}