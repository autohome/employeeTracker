-- need 3 tables. Departments, Roles, Employees



DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

-- DEPT- dept names, dept ids

CREATE TABLE departments(
    dept_id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL
);


-- Roles - job title, role id, the department that role belongs to, and the salary for that role

CREATE TABLE roles (
    job_title VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    salary INT NOT NULL
);



-- employees -showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

CREATE TABLE employees (
    employee_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    managed_by VARCHAR(30) NOT NULL
);