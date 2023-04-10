-- DEPT- dept names, dept ids

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO departments (dept_name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

-- Roles - job title, role id, the department that role belongs to, and the salary for that role

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id VARCHAR(30),
    salary INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

INSERT INTO roles (title, department, salary )
VALUES ("Sales Lead", 4, 100000),
        ("Salesperson", 4, 80000),
        ("Lead Engineer", 1, 150000),
        ("Software Engineer", 1, 120000),
        ("Account Manager", 2, 160000),
        ("Accountant", 2, 125000),
        ("Legal Team Lead", 3, 250000),
        ("Lawyer", 3, 190000);


-- employees -showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30),
    -- dept_name VARCHAR(30) NOT NULL,
    -- salary INT NOT NULL,
    managed_by VARCHAR(30),
    FOREIGN KEY (job_title)
    REFERENCES roles(title)
    ON DELETE SET NULL
);

INSERT INTO employees (first_name, last_name, job_title, managed_by)
VALUES ("John", "Doe", "Sales Lead", null),
        ("Mike", "Chan", " Salesperson", "John Doe"),
        ("Ashley", "Rodriguez", "Lead Engineer", null),
        ("Kevin", "Tupik", "Software Engineer", "Ashley Rodriguez"),
        ("Kunal", "Singh", "Account Manager", null),
        ("Malia", "Brown", "Accountant", "Kunal Singh"),
        ("Sarah", "Lourd", "Legal Team Lead", null),
        ("Tom", "Allen", "Lawyer", "Sarah Lourd");