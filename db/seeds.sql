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
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (department)
    REFERENCES departments(name)
);

INSERT INTO roles (title, department, salary )
VALUES ("Sales Lead", "Sales", 100000),
        ("Salesperson", "Sales", 80000),
        ("Lead Engineer", "Engineering", 150000),
        ("Software Engineer", "Engineering", 120000),
        ("Account Manager", "Finance", 160000),
        ("Accountant", "Finance", 125000),
        ("Legal Team Lead", "Legal", 250000),
        ("Lawyer", "Legal", 190000);


-- employees -showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    managed_by VARCHAR(30),
    FOREIGN KEY (managed_by)
    REFERENCES 
);