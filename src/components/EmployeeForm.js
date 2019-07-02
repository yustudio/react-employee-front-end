import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import history from "../history";

export class EmployeeForm extends Component {
    constructor() {
        super();
        this.state = {
            employee: 
                { ...this.props && this.props.employees 
                    ? this.props.employees.filter(e => parseInt(e.id) === parseInt(this.props.match.params.id))[0]
                    : {},
                    role: 'CEO',
                    hireDate: new Date(),
                },
            hireDate: new Date(),
            quote1: '',
            quote2: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSelectRole = this.onSelectRole.bind(this);
    }

    componentWillMount() {
        axios.get(`https://ron-swanson-quotes.herokuapp.com/v2/quotes`)
          .then(res => {
            this.setState({quote1: res.data[0]})
          })

        axios.get(`https://icanhazdadjoke.com/slack`)
          .then(res => {
            this.setState({quote2: res.data.attachments[0].text})
          })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            employee: 
                nextProps.employees 
                ? nextProps.employees.filter(e => 
                    e.id === this.props.match.params.id
                  )[0]
                : {}
        })
    }   

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.employee.firstName
            && this.state.employee.lastName
            && this.state.employee.role
            && (new Date(this.state.employee.hireDate) < new Date())) {

            let request = null;

            if (this.props && this.props.employees ) {
                request = axios.put(`http://localhost:5000/api/v1/posts/${this.props.match.params.id}`, {
                    ...this.state.employee,
                    "hireDate": this.state.employee.hireDate,
                    "role": this.state.employee.role,
                    "quote1": this.state.employee.quote1,
                    "quote2": this.state.employee.quote2,
                })
            } else {
                request = axios.post('http://localhost:5000/api/v1/posts/', {
                    ...this.state.employee,
                    "hireDate": this.state.employee.hireDate,
                    "role": this.state.employee.role,
                    "quote1": this.state.quote1,
                    "quote2": this.state.quote2,
                })
            }
           
            request.then(res => {    
                history.push('/')
            });
        } else  {
            alert("Error with input fields");
        }
    }

    onChangeFirstName(e) {
        this.setState({ employee: { ...this.state.employee, firstName: e.target.value}})
    }

    onChangeLastName(e) {
        this.setState({ employee: { ...this.state.employee, lastName: e.target.value}})
    }

    onChangeDate(date) {
        this.setState({
            employee: { 
                ...this.state.employee,
                hireDate: date
            }
        })
    }

    onSelectRole(role) {
        this.setState({
            employee: { 
                ...this.state.employee,
                role: role.value
            }
        })
    }


    render() {
        let options = [
          'CEO', 'VP', 'MANAGER', 'LACKEY'
        ];

        return (
            <form 
                onSubmit={this.onSubmit}
                className="employee__container"
                >
                First Name
                <input 
                    type="text" 
                    name="firstName"
                    className="employeeform__input"
                    placeholder="First Name" 
                    value={this.state.employee.firstName}
                    onChange={this.onChangeFirstName}
                />
                Last Name
                <input 
                    type="text" 
                    name="lastName"
                    className="employeeform__input"
                    placeholder="Last Name" 
                    value={this.state.employee.lastName}
                    onChange={this.onChangeLastName}
                />
                Hire Date
                <DayPickerInput
                    onDayChange={day => this.onChangeDate(day)}
                    value={this.state.employee.hireDate.toString().slice(0,10)}
                />
                Role
                <Dropdown
                  options={options}
                  onChange={this.onSelectRole}
                  value={this.state.employee.role}
                  placeholder="Select an option" 
                />
                <div className="employeeform__btncontainer">
                    <input 
                        type="submit"
                        value="Submit"
                        className="employeeform__btn"
                    />
                    <input 
                        type="submit"
                        value="Cancel"
                        className="employeeform__btn"
                        onClick={() => this.props.history.push('/')}
                    />
                </div>
            </form>
        )
    }
}

export default EmployeeForm;