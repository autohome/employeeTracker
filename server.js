const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');

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
    switch (command.userChoice) {
        case "View All Employees" :
            // this will query the database for all employees
            db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.managed_by = m.id;`, (err, res) => {
                console.table(res);
                init()
            });
            break;
        case "Add Employee":
            // this will prompt user to enter employee information
            addEmployee();
            break;
        case "Update Employee Role":
            updateRole();
            break;
        case "View All Roles":
            // this will query the database for all roles
            db.query('SELECT r.id, r.title, d.name AS department, r.salary FROM roles r JOIN departments d ON r.department_id = d.id;', (err, res) => {
                console.table(res);
                init()
            });
            break;
        case "Add Role":
            // this will prompt user to enter role information
            addRole();
            break;
        case "View All Departments":
            // this will query the database for all departments
            db.query('SELECT * FROM departments;', (err, res) => {
                console.table(res);
                init()
            });
            break;
        case "Add Department":
            // this will prompt user to enter department information
            addDepartment();
            break;
        case "Quit":
            // this will close the connection to the database
            exit();
            break;
    }
}

function updateRole() {
    db.query(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS employee_name FROM employees e`, (err, res) => {
        if (err) throw err;

        const employeeChoices = res.map(employee => ({ name: employee.employee_name, value: employee.id }));

        // Fetch list of roles from roles table
        db.query('SELECT * FROM roles;', (err, res) => {
            if (err) throw err;

            const roleChoices = res.map(role => ({ name: role.title, value: role.id }));

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    name: 'employeeID',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s new role?',
                    name: 'roleID',
                    choices: roleChoices
                }
            ]).then((response) => {
                db.query(
                    'UPDATE employees SET role_id =? WHERE id =?',
                    [response.roleID, response.employeeID],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Updated employee's role!\n`);
                        init();
                    }
                );
            });
        });
    });
};


function addEmployee() {
    db.query('SELECT * FROM roles;', (err, res) => {
        if (err) throw err;

        const roleChoices = res.map(role => ({ name: role.title, value: role.id }));

        // Fetch list of managers from employees table
        db.query('SELECT id, CONCAT(first_name, " ", last_name) AS manager_name FROM employees;', (err, res) => {
            if (err) throw err;

            const managerChoices = [{ name: "None", value: null }]
                .concat(res.map(manager => ({ name: manager.manager_name, value: manager.id })));


            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the employee\'s first name?',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s last name?',
                    name: 'lastName'
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    name: 'roleID',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    name: 'managerID',
                    choices: managerChoices
                }
            ]).then((response) => {
                db.query(
                    'INSERT INTO employees (first_name, last_name, role_id, managed_by) VALUES (?, ?, ?, ?)',
                    [response.firstName, response.lastName, response.roleID, response.managerID],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} employee inserted!\n`);
                        init();
                    }
                );
            });
        });
    });
}



function addRole() {
    db.query('SELECT id, name FROM departments', (err, res) => {
        if (err) throw err;

        const choices = res.map(dept => ({ name: dept.name, value: dept.id }));

        inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role you would like to add?',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary of the role you would like to add?',
                name:'salary'
            },
            {
                type: 'list',
                message: 'What is the department ID of the role you would like to add?',
                name: 'departmentID',
                choices: choices
            }
        ]).then((response) => {
            // Insert new role into database
            db.query(
                'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);',
                [response.roleName, response.salary, response.departmentID],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role inserted!\n`);
                    init();
                }
            );
        });
    });
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'departmentName'
        },
    ])
    .then((response) => { 
        db.query(`INSERT INTO departments (name) VALUES (?);`, response.departmentName, (err, res) => {
            if (err) throw err;
            console.log(`Added ${response.departmentName} to departments.`);
            init();
        });
    })
}
        

function exit () {
    prompt.ui.close();
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () =>
//     // console.log(`Example app listening at http://localhost:${PORT}`)
// );

init();