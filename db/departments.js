const db = require("./connection");

function viewAllDepartments() {
    try {
        const departments =
        await db.promise().query('SELECT * FROM department')

    return departments[0]
    } catch (err) {
    console.log(err)
    }
}