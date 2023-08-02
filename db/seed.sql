INSERT INTO department (department_name)
VALUES ("Development"),
       ("Legal"),
       ("Sales"),
       ("Customer service"),
       ("HR");
       
INSERT INTO roles(title, salary, department_id)
VALUES ("Salesman",80000, 3),
       ("Lead Engineer",120000,1),
       ("Sales Leaders",60000,3),
       ("Grunt",42000,3),
       ("Coder",70000,1),
       ("Lawyer",150000,2),
       ("Lead Lawyer",200000,2),
       ("HR Rep",400000,4);

INSERT INTO employee (first_name,last_name,role_id)
VALUES ("John","Doe",1),
       ("Sarah","Lee",3),
       ("Justin","Clay",2),
       ("Joe","Day",4),
       ("hector","Fay",8),
       ("April","Tray",7),
       ("Jake","Fay",6),
       ("George","May",5);

UPDATE employee SET manager_id=3  WHERE id=8;
UPDATE employee SET manager_id=2 WHERE id=1;
UPDATE employee SET manager_id=6 WHERE id=7;

       