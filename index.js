//import statements
//create inquirer questions
//switch statement


const viewAllEmployees=()=>{
    //query database
    //display results
    //return to main menu
}
    const addNewEmployee={
}

const addNewRole=()=>{
    //add the name of the role
    //ask the salary
    //query departments
        //ask department with list of choices
        //write new data to db
    //return confirmation message
    //return to main menu
}

const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'sonamsherpa1',
    database: 'courses_db'
  },);









  //npm knex
