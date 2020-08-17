import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Choice = props => (
    <tr>
        <td>{props.choice.tgname}</td>
        <td>{props.choice.choice}</td>
        <td>
            <Link to={"/edit/" + props.choice._id}>edit</Link> | <a href="#" onClick={() => { props.deleteChoice(props.choice._id) }}>delete</a>
        </td>
    </tr>
)

export default class ChoiceList extends Component {
    constructor(props) {
        super(props);

        this.deleteChoice = this.deleteChoice.bind(this)

        this.state = { 
            tgname: '',
            choice: '',
            choices: []
         }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/choices/')
            .then(response => {
                this.setState({ 
                    choices: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteChoice(id) {
        axios.delete('http://localhost:5000/choices/'+id)
            .then(response => { console.log(response.data) });

        this.setState({
            choices: this.state.choices.filter(el => el._id !== id)
        })
    }

    choiceList() {
        return this.state.choices.map(currentchoice => {
            return <Choice choice={currentchoice} deleteChoice={this.deleteChoice} key={currentchoice._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Report of user's Choices</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Target Name</th>
                            <th>Choice</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.choiceList()}
                    </tbody>
                </table>
            </div>
        )
    }
}