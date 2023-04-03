const db = require("./connection");

async function viewAllRoles() {
    try {
        const roles =
        await db.query('SELECT role.title, role.id, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id')

    return roles
    } catch (err) {
    console.log(err)
    }
}

module.exports = {viewAllRoles}