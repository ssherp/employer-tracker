USE tracker_db;
SELECT roles.id,title,department_name,salary
FROM roles
LEFT JOIN department ON roles.department_id=department.id;

SELECT employee.id,employee.first_name,employee.last_name,title,department_name,salary,CONCAT(m.first_name," ",m.last_name) manager
FROM employee
LEFT JOIN roles ON employee.role_id=roles.id
LEFT JOIN department ON roles.department_id=department.id
LEFT JOIN employee m ON employee.manager_id=m.id;

SELECT * FROM employee WHERE employee.role_id IN (2,3,7);