export const createRoleQuery = `
    CREATE TYPE role_type AS 
    ENUM ('Manager', 'Developer', 'HR' ,'Sales', 'Intern');
`;

export const createEmployeeTableQuery = `
CREATE TABLE employee_details(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    age SMALLINT NOT NULL CHECK (age > 17),
    role role_type NOT NULL DEFAULT 'Intern',
    salary DECIMAL(8,2) NOT NULL
  );
`;

export const getAllEmployeeQuery = `
SELECT * FROM employee_details
`;

export const createEmployeeQuery = `
INSERT INTO employee_details (name, email, age, role, salary)
VALUES ($1, $2, $3, COALESCE($4::role_type, 'Intern'::role_type ), $5) RETURNING *;
`;

export const getEmployeebyIdQuery = `
SELECT * FROM employee_details WHERE id = $1;
`;

export const deleteEmployeeQuery = `
DELETE FROM employee_details WHERE id = $1 RETURNING *;
`;

export const updateEmployeeQuery = `
UPDATE employee_details SET name = $1, email = $2, age = $3, role = COALESCE($4::role_type, 'Intern'::role_type), salary = $5 WHERE id = $6 RETURNING *;`;
