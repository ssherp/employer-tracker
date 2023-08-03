const mysql = require('mysql2');
const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
//import statements
//create inquirer questions
//switch statement
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'sonamsherpa1',
        database: 'tracker_db'
    },);
db.connect(() => menu())


const viewAllDepartments = () => {
    db.query("select * from department", (err, data) => {
        printTable(data)
        menu()
    })
}
//need to join tables
const viewAllRoles = () => {
    db.query("select * from roles", (err, data) => {
        printTable(data)
        menu()
    })
}
//need to join tables
const viewAllEmployees = () => {
    db.query("select* from employee", (err, data) => {
        printTable(data)
        menu()
    })
}

const addNewDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "add new department",

    }])
        .then(res => {
            db.query("insert into department (department_name) VALUES (?)", res.departmentName, (err, data) => {
                menu()
            })
        })
}


const addNewRole = () => {

    db.query("select * from department", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const departmentChoices = data.map((department) => department.department_name);
        inquirer.prompt([
            {
                type: "input",
                name: "newRole",
                message: "what is the new Role?",
            },
            {
                type: "input",
                name: "salary",
                message: "what is the salary of the Role?",
            },
            {
                type: "list",
                name: "roleToDepartments",
                message: "which department does the role belong to?",
                choices: departmentChoices,
            },
        ])
            .then(res => {
                const { newRole, salary, roleToDepartments} = res;
                //db.query("SELECT id FROM department WHERE department_name = ?",roleToDepartments)
                db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?))",
                    [newRole, salary, roleToDepartments],
                    (err, data) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("New role added successfully!");
                        }
                        menu();
                    }
                );
            });
    });
};



const addNewEmployee = () => {
    
}

const updateEmployeeRole = () => {

}


const questions = [{
    type: "list",
    name: "menu",
    message: "pick from the list of chooses",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
}
]


const menu = () => {
    inquirer.prompt(questions).then(res => {
        switch (res.menu) {
            case "view all departments":
                viewAllDepartments()
                break;
            case "view all roles":
                viewAllRoles()
                break;
            case "view all employees":
                viewAllEmployees()
                break;
            case "add a department":
                addNewDepartment()
                break;
            case "add a role":
                addNewRole()
                break;
            case "add an employee":
                addNewEmployee()
                break;
            case "update an employee role":
                updateEmployeeRole()
                break;
        }
    })
}









  //npm knex
