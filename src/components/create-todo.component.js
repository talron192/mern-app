import React, { Component } from 'react';
import axios from 'axios';
// import EditTodo from "../components/edit-todo.component";
import { Link } from 'react-router-dom';

import './style.css';


export default class CreateTodo extends Component {
    list = [];
    changeColor = false;
    constructor(props) {
        super(props);

        this.state = {

            fullName: '',
            email: '',
            gender: '',
            tz: '',
            date: '',
            issueDate: '',
            phoneNumber: '',
            houseNumber: '',
            fax: '',
            pathFolder: '',

            //isCompleted:false
        }
    }

    selectGender(gender) {
        if (gender === 1) {
            this.setState({gender: 'men'})
        }
        if (gender === 2) {
            this.setState({ gender: 'women' })
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        console.log('handleSubmit');
        const newCustomer = {
            fullName: this.state.fullName,
            // password: this.state.password,
            email: this.state.email,
            gender: this.state.gender,
            tz: this.state.tz,
            date: this.state.date,
            issueDate: this.state.issueDate,
            houseNumber: this.state.houseNumber,
            phoneNumber: this.state.phoneNumber,
            fax: this.state.fax,
            pathFolder: 'public/uploads/'+this.state.tz,
        };
        console.log(newCustomer);
        axios.post('http://localhost:4000/customers/add', newCustomer)
            .then(res => {
               
                console.log('after then response', res.data);
            })
            .catch(err => {
                console.log(err);
            });
        console.log('list', this.list);
    }
    render() {
        console.log(this.state.gender);

        var grid = (
            <div className="form-fields" >
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="fullName"
                            onChange={this.handleChange.bind(this)} placeholder="Full name"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="tz" placeholder="ID"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="date" onChange={this.handleChange.bind(this)}
                            id="date" placeholder="Date"></input>
                    </div>
                    {/* <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="password" placeholder="Password"></input>
                    </div> */}
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="email" placeholder="Email"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="date" onChange={this.handleChange.bind(this)}
                            id="issueDate" placeholder="IssueDate"></input>
                    </div>
                    <div style={{ marginTop: '-1em', marginLeft: '5em' }}
                        className="col=md-2"
                        className="gender-position"
                        className={this.state.gender === "men" ? "gender-color" : ""} >
                        {/* <input
                            type="radio"
                            onChange={this.handleChange.bind(this)}
                            value="men"
                            id="gender"
                            checked={this.state.gender === "men"}>
                        </input> */}
                        <label className="gender-font"
                            value={"men"}
                            id="gender"
                            onClick={() => this.selectGender(1)
                            }>
                            <i className="fa fa-male" aria-hidden="true"></i>
                        </label>
                    </div>
                    <div style={{ marginTop: '-1em', marginLeft: '5em' }}
                        className="col=md-2"
                        className="gender-position"
                        className={this.state.gender === "women" ? "gender-color" : ""} >
                        {/* <input
                            type="radio"
                            onChange={this.handleChange.bind(this)}
                            value="women"
                            id="gender"
                            checked={this.state.gender === "women"}>
                        </input> */}
                        <label className="gender-font"
                            value={"women"}
                            id="gender"
                            onClick={() => this.selectGender(2)
                            }>
                            <i className="fa fa-female" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="houseNumber" placeholder="House Number"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="phoneNumber" placeholder="Phone Number"></input>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" onChange={this.handleChange.bind(this)}
                            id="fax" placeholder="Fax"></input>
                    </div>
                </div>
                <hr></hr>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success"
                            style={{ float: 'right' }}
                            onClick={this.handleSubmit.bind(this)} >
                            <Link style={{ color: 'black' }}  to={"/edit/"+this.state.tz}>שמור והמשך</Link>
                        </button>
                    </div>

                </div>
            </div>
        );


        return (
            <div className="App">
                <header className="App-header">
                    <h1 style={{ textAlign: 'center' }}><b>רישום לקוח</b></h1>
                    <div >
                        {grid}
                    </div>
                </header>
            </div>
        );
    }

}
