INSERT INTO department (name)
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

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John","Doe",1,2),
       ("Sarah","Lee",3,null),
       ("Justin","Clay",2,null),
       ("Joe","Day",4,2),
       ("hector","Fay",8,null),
       ("April","Tray",7,null),
       ("Jake","Fay",6,7),
       ("George","May",5,3);



       