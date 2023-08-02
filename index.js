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
db.connect(()=>menu())
const viewAllDepartments=()=>{
db.query("select * from department",(err,data)=>{
    printTable(data)
    menu()
})
}
const viewAllRoles=()=>{

}
const viewAllEmployees = () => {
    //query database
    //display results
    //return to main menu
}

const addNewDepartment=()=>{
inquirer.prompt([{
   type:"input",
   name:"departmentName",
   message:"add new department",

}])
.then(res=>{
    db.query("insert into department")
})
}



const addNewRole = () => {
    inquirer.prompt([{
        type:"input",
        name:"title",
        message: "add title",

    },
{
    
}])
    //add the name of the role
    //ask the salary
    //query departments
    //ask department with list of choices
    //write new data to db
    //return confirmation message
    //return to main menu
}
const addNewEmployee=()=> {
}

const updateEmployeeRole=()=>{

}


const questions = [{

    type: "list",
    name: "menu",
    message: "pick from the list of chooses",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]

}
]


    const menu=() =>{
        inquirer.prompt(questions).then(res=>{
            switch(res.menu){
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
