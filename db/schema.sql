-- need 3 tables. Departments, Roles, Employees



DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

-- DEPT- dept names, dept ids

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


-- Roles - job title, role id, the department that role belongs to, and the salary for that role

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);



-- employees -showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    -- dept_name VARCHAR(30) NOT NULL,
    -- salary INT NOT NULL,
    managed_by INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);