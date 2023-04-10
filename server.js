const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));

const homeChoices = ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'joshjosh',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

function init() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'userChoice',
            choices: homeChoices
        },
    ])
    .then((response) =>
        startWork(response))
}

function startWork(command) {
    switch (command) {
        case "View All Employees" :
            command;
        case "Add Employee":

        case "Update Employee Role":

        case "View All Roles":

        case "Add Role":

        case "View All Departments":

        case "Add Department":

        case "Quit":
            exit();
    }
}


function exit () {
    prompt.ui.close
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

init();