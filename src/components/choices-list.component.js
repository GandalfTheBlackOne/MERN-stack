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

        this.deleteChoice = this.deleteChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.resetFilterBtn = this.resetFilterBtn.bind(this);

        this.state = { 
            tgname: '',
            choice: '',
            choices: [],
            filterkey: ''
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


    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.filter;
        const filterkey = form.filterkey.value;
        console.log(filterkey);
       
        
        this.setState({
            choices: this.state.choices.filter(function (el) {
                return el.tgname.toLowerCase().indexOf(filterkey.toLowerCase()) !== -1
            })
        })            
        form.filterkey.value = "";
    }

    resetFilterBtn() {
        axios.get('http://localhost:5000/choices/')
            .then(response => {
                this.setState({
                    choices: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeFilter(e) {
        if(e == ""){
            axios.get('http://localhost:5000/choices/')
                .then(response => {
                    this.setState({
                        choices: response.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            this.setState({
                choices: this.state.choices.filter(function (el) {
                    return el.tgname.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
                })
            })
        }
    }

    choiceList() {
        return this.state.choices.map(currentchoice => {
            return (
            <Choice choice={currentchoice} 
            deleteChoice={this.deleteChoice} key={currentchoice._id} />
            
            );
        })
    }

    render() {
        return (
            <div>
                <h3>Report of user's Choices</h3>
                <form name="filter" onSubmit={this.handleSubmit}>
                    <div className="form-froup">
                        <input type="text" name="filterkey" placeholder="Filter by name" />
                        <button>Search</button>
                        <button type='reset' onClick={this.resetFilterBtn}>Reset</button>
                    </div>
                </form>
                <br/>
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

