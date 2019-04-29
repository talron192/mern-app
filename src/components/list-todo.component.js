import React, { Component } from 'react';
import axios from 'axios';
// import ImporterAPI from './Api';
import { Link } from 'react-router-dom';

// const API = new ImporterAPI()


const Customer = props => (
    <tr>
        <td>{props.customer.fullName}</td>
        {/* <td>{props.customer.password}</td> */}
        <td>{props.customer.email}</td>
        <td>{props.customer.gender}</td>
        <td>{props.customer.tz}</td>
        <td>{props.customer.date}</td>
        {/* <td>{props.issueDate.issueDate}</td> */}
        <td>
            <Link to={"/edit/"+props.customer.tz}>העלאת מסמכים</Link>
        </td>
    </tr>
)

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/customers/get')
            .then(res => {
                // const posts = res.data.data.children.map(obj => obj.data);
                this.setState({ list: res.data });
            })
            .catch(function (err) {
                console.log('error-componentMount', err);
            })
    }

    customersList() {
        return this.state.list.map(function (currentCustomer, i) {
            return <Customer customer={currentCustomer} key={i} />;
        });
    }

    render() {
        return <div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">שם פרטי ומשפחה</th>
                        {/* <th scope="col">password</th> */}
                        <th scope="col">דואר אלקטרוני</th>
                        <th scope="col">מין</th>
                        <th scope="col">ת.ז</th>
                        <th scope="col">תאריך לידה</th>
                    </tr>
                </thead>
                <tbody>
                    {this.customersList()}

                </tbody>
            </table>
        </div>
    }
}
