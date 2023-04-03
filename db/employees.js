const db = require("./connection");
// const {viewRoles} = require("./roles");

async function viewAllEmployees() {
    try {
        const employees =
        await db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, role.department_id, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id')
        // SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id
    return employees
    } catch (err) {
    console.log(err)
    }
}

module.exports = {viewAllEmployees}