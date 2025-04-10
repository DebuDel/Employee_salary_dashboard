import { query } from "../utils/connectToDB.js";
import {
  createEmployeeTableQuery,
  createRoleQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
  getEmployeebyIdQuery,
  deleteEmployeeQuery,
  updateEmployeeQuery,
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";

export async function getAllEmployee(req, res, next) {
  try {
    const response = await query("SELECT to_regclass('employee_details');");
    if (!response.rows[0].to_regclass) {
      await query(createRoleQuery);
      await query(createEmployeeTableQuery);
    }

    const { rows } = await query(getAllEmployeeQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.log("Error:", error.message);
    return next(createError(400, "Coudn't fetch employees_details"));
  }
}

export async function getEmployeebyId(req, res, next) {
  const id = req.params.id;
  const data = await query(getEmployeebyIdQuery, [id]);
  if (!data.rows.length) {
    return next(createError(400, "Employee not found"));
  }

  res.status(200).json(data.rows[0]);
}

export async function createEmployee(req, res, next) {
  try {
    const { name, role, salary, age, email } = req.body;
    if (!name || !salary || !age || !email) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const data = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ]);
    res.status(201).json(data.rows[0]);
  } catch (error) {
    console.log("Error:", error.message);
    return next(createError(400, error.message));
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const { id } = req.params;
    const { name, role, salary, age, email } = req.body;
    if (!name || !salary || !age || !email) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
    const data = await query(updateEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
      id,
    ]);

    if (!data.rowCount) {
      return res.status(400).json({ error: "Employee not found" });
    }

    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log("Error:", error.message);
    return next(createError(400, error.message));
  }
}

export async function deleteEmployee(req, res, next) {
  const id = req.params.id;
  const data = await query(deleteEmployeeQuery, [id]);
  if (!data.rowCount) {
    return next(createError(400, "Employee not found"));
  }

  res.status(200).json({ message: "Employee deleted successfully" });
}
