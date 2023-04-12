
SELECT e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.managed_by = m.id;