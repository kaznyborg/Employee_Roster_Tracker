
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment, deleteDepartment } = require('./db/departments');
const { viewAllEmployees, addEmployee, updateEmployee } = require("./db/employees");
const { viewAllRoles, addRole, deleteRole } = require("./db/roles");

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice} = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'view all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Delete department',
                'Delete role',
                'Exit'
            ]
        }
    ])

    //make available all given options (logic will be in given db)
    switch (choice) {
        case 'view all departments':
            const departments = await viewAllDepartments()
            console.table(departments)
            break;
        case 'View all employees':
            const employees = await viewAllEmployees()
            console.table(employees)
            break;
        case 'View all roles':
            const roles = await viewAllRoles()
            console.table(roles)
            break;
        case 'Add a department':
            const newDepartment = await addDepartment()
            console.table(newDepartment)
            break;
        case 'Add a role':
            const newRole = await addRole()
            console.table(newRole)
            break;
        case 'Add an employee':
            const newEmployee = await addEmployee()
            console.table(newEmployee)
            break;
        case 'Update an employee role':
            const updatedEmployee = await updateEmployee()
            console.table(updatedEmployee)
            break;
            case 'Delete department':
            const deletedDepartment = await deleteDepartment()
            console.table(deletedDepartment)
            break;
            case 'Delete role':
            const deletedRole = await deleteRole()
            console.table(deletedRole)
            break;
    }
    start(false);
}

start();
