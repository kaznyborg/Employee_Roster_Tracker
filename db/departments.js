const inquirer = require("inquirer");
const db = require("./connection");

async function viewAllDepartments() {
    try {
        const departments =
        await db.query('SELECT * FROM department')

    return departments
    } catch (err) {
    console.log(err)
    }
}

//create addDepartment

async function addDepartment(){
    try{
        const departments = await viewAllDepartments();
        const {
            name,
        } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What department would you like to add?"
            }
        ])
        await db.query(`INSERT into department (name) VALUES ("${name}")`)
        const newDepartment = await viewAllDepartments();
        return newDepartment
    } catch (err){
        console.log(err)
    }
}

//create removeDepartment

async function deleteDepartment(){
    try{
        const viewDepartments = await viewAllDepartments();
        const {id} = await inquirer.prompt([
            {
                type:"list",
                message:"Which of these departments have been removed?",
                name:"id",
                choices: viewDepartments.map((department) => {
                return {
                    name: department.name,
                    value: department.id
                };
                }),
            },
        ]);
        await db.query(`DELETE FROM department WHERE id = ${id}`);
        return await viewAllDepartments();
    } catch (err){
        console.log (err);
    }
}

module.exports = {viewAllDepartments, addDepartment, deleteDepartment}