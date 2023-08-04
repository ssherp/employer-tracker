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
    db.query(`SELECT roles.id,title,department_name,salary
    FROM roles
    LEFT JOIN department ON roles.department_id=department.id;`, (err, data) => {
        printTable(data)
        menu()
    })
}
//need to join tables
const viewAllEmployees = () => {
    db.query(`SELECT employee.id,employee.first_name,employee.last_name,title,department_name,salary,CONCAT(m.first_name," ",m.last_name) manager
    FROM employee
    LEFT JOIN roles ON employee.role_id=roles.id
    LEFT JOIN department ON roles.department_id=department.id
    LEFT JOIN employee m ON employee.manager_id=m.id;`, (err, data) => {
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
                const { newRole, salary, roleToDepartments } = res;
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
    db.query("select * from roles", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const roleChoices = data.map((role) => ({
            name: role.title,
            value: role.id
        }));
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter the first name of the employee:",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter the last name of the employee:",
            },
            {
                type: "list",
                name: "roleId",
                message: "Select the role for the employee:",
                choices: roleChoices,
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter the manager ID for the employee (if applicable):",
            }
        ])
            .then(res => {
                const { firstName, lastName, roleId, managerId } = res;

                db.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [firstName, lastName, roleId, managerId || null],
                    (err, data) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("New employee added successfully!");
                        }
                        menu();
                    }
                );
            });
    });
};

const updateEmployeeRole = () => {
    db.query("SELECT * FROM employee", (err, employeeData) => {
        if (err) {
            console.error(err);
            return;
        }

        db.query("SELECT * FROM roles", (err, roleData) => {
            if (err) {
                console.error(err);
                return;
            }

            // Extract employee names from the employee data
            const employeeChoices = employeeData.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));

            // Extract role titles from the role data
            const roleChoices = roleData.map((role) => ({
                name: role.title,
                value: role.id,
            }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee whose role you want to update:",
                    choices: employeeChoices,
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "Select the new role for the employee:",
                    choices: roleChoices,
                },
            ])
                .then(res => {
                    const { employeeId, roleId } = res;

                    db.query(
                        "UPDATE employee SET role_id = ? WHERE id = ?",
                        [roleId, employeeId],
                        (err, data) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("Employee role updated successfully!");
                            }
                            menu();
                        }
                    );
                });
        });
    });
};


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
