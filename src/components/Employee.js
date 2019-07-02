import React, { Component } from 'react';

export class Employee extends Component {
    editEmployee(id) {
        this.props.history.push(`/employee/edit/${id}`);
    }

    render() {
        const { id, firstName, lastName, hireDate, role, quote1, quote2 } 
            = this.props.employee;

        return (
              <div className="employee__card">
                <div className="employee__info">
                    <div className="employee__name">
                        <div className="employee__name--first">First Name: {firstName}</div>
                        <div className="employee__name--last">Last Name: {lastName}</div>
                        <div className="employee__role">{role}</div>
                    </div>
                    <div className="employee__hiredate">
                        <div className="employee__hireStartDate">Hire Date:</div>
                        {hireDate.slice(0,10)}
                    </div>
                </div>
                <div className = "employee__quotes">
                    <div className = "employee__quote">
                        {quote1}
                    </div>
                    <div className = "employee__quote">
                        {quote2}
                    </div>
                </div>
                <div className="employee__cardActions">
                    <button 
                        onClick={() => this.editEmployee(id)}
                        className="employee__cardBtn"
                    >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                    </button>
                    <button
                        onClick={() => this.props.delEmployee(id)}
                        className="employee__cardBtn"
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
              </div>
        )
    }
}

export default Employee;