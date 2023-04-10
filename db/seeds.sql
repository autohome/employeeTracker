-- DEPT- dept names, dept ids

INSERT INTO departments (name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

-- Roles - job title, role id, the department that role belongs to, and the salary for that role

INSERT INTO roles (title, department_id, salary )
VALUES ("Sales Lead", 4, 100000),
        ("Salesperson", 4, 80000),
        ("Lead Engineer", 1, 150000),
        ("Software Engineer", 1, 120000),
        ("Account Manager", 2, 160000),
        ("Accountant", 2, 125000),
        ("Legal Team Lead", 3, 250000),
        ("Lawyer", 3, 190000);


-- employees -showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to


INSERT INTO employees (first_name, last_name, role_id, managed_by)
VALUES ("John", "Doe", 1, null),
        ("Mike", "Chan", 2, "John Doe"),
        ("Ashley", "Rodriguez", 3, null),
        ("Kevin", "Tupik", 4, "Ashley Rodriguez"),
        ("Kunal", "Singh", 5, null),
        ("Malia", "Brown", 6, "Kunal Singh"),
        ("Sarah", "Lourd", 7, null),
        ("Tom", "Allen", 8, "Sarah Lourd");