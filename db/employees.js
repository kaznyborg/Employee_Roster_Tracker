const db = require("./connection");
const inquirer = require("inquirer");
const {viewAllRoles} = require("./roles");

async function viewAllEmployees() {
    try {
        const employees =
        await db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, role.department_id, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id')
    return employees
    } catch (err) {
    console.log(err)
    }
}

//create addEmployee

async function addEmployee(){
    try {
        const roles = await viewAllRoles();
        const employee = await viewAllEmployees();
        const {
            first_name,
            last_name,
            role,
            manager
        } = await inquirer.prompt([
            {
                type:"input",
                name:"first_name",
                message:"What is the employee's first name?"
            },
            {
                type:"input",
                name:"last_name",
                message:"What is the employee's last name?"
            },
            {
                type:"list",
                name:"role",
                message:"What role is the employee?",
                choices: roles.map(role => {
                    return {
                        value: role.id,
                        name: role.title
                    };
                }),
            },
            {
                type:"list",
                name:"Manager",
                message:"Who is the employee's manager?",
                choices: [
                    ...employee.map((e) => {
                        return{
                    value: e.id,
                    name: `${e.first_name} ${e.last_name}`
                };
                
                }),
                {
                    value: null,
                    name: "No Manager"
                }
                    ]
            }
        ])
        await db.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role}", "${manager}")`);
        const newEmployee = await viewAllEmployees();
        return newEmployee;
    } catch (err) {
        console.log(err)
    }
}


//create updateEmployee



//create removeEmployee



module.exports = {viewAllEmployees, addEmployee}