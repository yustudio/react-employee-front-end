import React, { Component } from "react";

import Employee from './Employee';

class Employees extends Component {
    render() {
        return this.props.employees.map((e, index) => (
            <div className="employee__container">
                <Employee
                    {...this.props}
                    key={index}
                    employee={e}
                    delEmployee={this.props.delEmployee}
                    editEmployee={this.props.editEmployee}
                />
            </div>
        ));
    }
}

export default Employees;