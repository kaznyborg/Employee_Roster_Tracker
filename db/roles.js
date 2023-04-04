const inquirer = require("inquirer");
const db = require("./connection");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try {
        const roles =
        await db.query('SELECT role.title, role.id, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id')

    return roles
    } catch (err) {
    console.log(err)
    }
}

//create addRole

async function addRole() {
    try {
        const departments = await viewAllDepartments();
        const {
            title,
            salary,
            department_id
        } = await inquirer.prompt([
            {
                type:"input",
                name:"title",
                message:"What role would you like to add?"
            },
            {
                type:"input",
                name:"salary",
                message:"What is the salary?"
            },
            {
                type:"list",
                name:"department_id",
                message:"What department does vthis role belong to?",
                choices: departments.map(department => {
                    return {
                        value: department.id,
                        name: department.name
                    };
                }),
            }
        ])
        await db.query(`INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const newRole = await viewAllRoles()
        return newRole
    } catch (err) {
        console.log(err)
    }
}

//create removeRole

async function deleteRole() {
    try{
        const roleList = await viewAllRoles();
        const {id} = await inquirer.prompt([
            {
                type:"list",
                message:"Which role have been removed?",
                name:"id",
                choices: roleList.map((role) => {
                    return {
                        name: role.name,
                        value: role.id
                    };
                }),
            },
        ]);
        await db.query(`DELETE FROM roles WHERE id = ${id}`);
        return await viewAllRoles();
    } catch (err){
        console.log (err);
    }
}

module.exports = {viewAllRoles, addRole, deleteRole}