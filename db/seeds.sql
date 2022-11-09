INSERT INTO departments (name)
VALUES
    ('Management'),
    ('Sales'),
    ('Customer Service'),
    ('Software Development'),
    ('Marketing');

INSERT INTO roles (title, salary, department)
VALUES
    ('Lead Manager', 120000, 1),
    ('Vice Manager', 100000, 1),
    ('Associate Manager', 85000, 1),
    ('Salesperson', 85000, 2),
    ('Secretary', 55000, 2),
    ('Quality Assurance Representative', 65000, 3),
    ('Customer Service Representative', 65000, 3),
    ('Lead Developer', 175000, 4),
    ('Senior Developer', 125000, 4),
    ('Developer', 60000, 4),
    ('Lead Graphic Designer', 75000, 5),
    ('Field Marketer', 65000, 5),
    ('Data Analyst', 75000, 5);

INSERT INTO employees (first_name, last_name, role, manager_id)
VALUES 
    ('Randy', 'Phillips', 1, 1),
    ('Martha', 'Flores', 2, 1), 
    ('Frank', 'Morgan', 3, 2), 
    ('Marie', 'Gonzales', 3, 3),
    ('Wayne', 'Lewis', 4, 1), 
    ('Ruby', 'Williams', 5, 4), 
    ('Maria', 'Sanders', 6, 2), 
    ('Carl', 'Reed', 7, 2),
    ('Denise', 'Alexander', 8, 1),
    ('Anne', 'Powell', 9, 1),
    ('Scott', 'Washington', 10, 3),
    ('Charles', 'Torres', 11, 2),
    ('Gary', 'Richardson', 12, 3),
    ('Diana', 'Robinson', 13, 2),
    ('Theresa', 'Watson', 4, 1),
    ('Sean', 'Gray', 4, 1),
    ('Alan', 'Patterson', 7, 4),
    ('Deborah', 'Edwards', 12, 3);