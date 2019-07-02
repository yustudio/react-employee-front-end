import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Employees from './components/Employees';
import EmployeeForm from './components/EmployeeForm';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      employees: [],
    }
    this.delEmployee = this.delEmployee.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/v1/posts/')
      .then(res => {
        this.setState({ employees: res.data })
        
      });
  }

  delEmployee(id) {
    axios.delete(`http://localhost:5000/api/v1/posts/${id}`)
      .then(res => this.setState({ employees: [...this.state.employees.filter(e => e.id !== id)] }));
  }

  editEmployee(id) {
    this.props.history.push('/')
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="employee__button--add">
            <Link to="/employee/add">Add Employee</Link>
          </div>
          <div className="employeeform">
            <Route exact 
              path="/" 
              render = {props => (
              <Employees
                {...props}
                employees = {this.state.employees}
                delEmployee = {this.delEmployee.bind(this)} 
              />
            )} />
            <Route 
              path="/employee/add" 
              render = {props => 
                <EmployeeForm 
                  {...props}
                  employee = {{}}/>
              }
            />
            <Route 
              path="/employee/edit/:id" 
              render={props => 
                <EmployeeForm 
                  {...props}
                  employees = {
                    this.state.employees
                  }
              />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
