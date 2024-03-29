const inquirer = require('inquirer');
// Import
const mysql = require('mysql2');
const table = require('console.table');
// Connect to DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employeeTracker_db'
    },
);

// Menu prompt and choice response
function menu() {
    inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add a Department",
                    "Add an Employee",
                    "Add a Role",
                    "Quit",
                ]
            }])
        .then((response) => {
            console.log(response.choice)
            if (response.choice === "View All Departments") {
                getAllDepartments()
            } else if ("View All Roles" === response.choice) {
                getAllRoles()
            } else if ("View All Employees" === response.choice) {
                getAllEmployees()
            } else if ("Add a Department" === response.choice) {
                addDepartment()
            } else if ("Add a Role" === response.choice) {
                addRole()
            } else if ("Add an Employee" === response.choice) {
                addEmployee()
            } else if ("Update Employee Role" === response.cho) {
                updateEmployeeRole()
            }
        })
};

// All Dept
function getAllDepartments() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            menu();
        }
    })
}

// All Roles
function getAllRoles() {
    db.query("SELECT * FROM roles", (err, results) => {
        if (err) {
            console.table(err);
        } else {
            console.table(results);
            menu();
        }
    })
}

// All Employees
function getAllEmployees() {
    db.query("SELECT * FROM employee", (err, results) => {
        if (err) {
            console.table(err);
        } else {
            console.table(results);
            menu();
        }
    })
}

// Add Dept
function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        const query = db.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name

            },
            function (err) {
                if (err) throw err
                console.table(res);
                menu();
            });
    });
};

// Add Role
function addRole() {
    db.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err
            const choices = res.map(department => department.name);
            inquirer.prompt(
                [
                    {
                        name: "title",
                        type: "input",
                        message: "What is the employee's name?"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What is the employee's salary?"
                    },
                    {
                        name: "department",
                        type: "list",
                        message: "What department will they be in?",
                        choices: choices
                    }]

            ).then(function (answers) {
                const findDept = res.find(department => department.name === answers.department);
                db.query("INSERT INTO roles SET ?",
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: findDept.id
                    },

                    function (err) {
                        if (err) throw err
                        menu();
                    });
            });
        });
};

// Add Employee
const roleArr = [];
function selectRole() {
    db.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }

    })
    return roleArr;
}

const managersArr = [];
function selectManager() {
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is their first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is their last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        }

    ]).then(function (answers) {
        const roleId = selectRole().indexOf(answers.role) + 1
        const managerId = selectManager().indexOf(answers.manager) + 1
        db.query("INSERT INTO employee SET ?",
            {
                first_name: answers.firstname,
                last_name: answers.lastname,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(answers)
                menu()
            })

    })
}

// Update Employee
function updateEmployeeRole() {
    db.query("SELECT employee.last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id;", function (err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: function () {
                    const lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name? ",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the Employees new title? ",
                choices: selectRole()
            },
        ]).then(function (res) {
            const roleId = selectRole().indexOf(res.role) + 1
            db.query("UPDATE employee SET WHERE ?",
                {
                    last_name: res.lastName

                },
                {
                    role_id: roleId

                },
                function (err) {
                    if (err) throw err
                    console.table(res)
                    menu()
                })

        });
    });
}
// Call Menu
menu();