
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require('./db/departments');

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
                'Add a role',
                'Add an empllyee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])

    switch (choice) {
        case 'view all departments':
            const data = await viewAllDepartments()
            console.table(data)
    }
}

start();
