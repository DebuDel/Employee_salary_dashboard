import express from "express";
import {
  getAllEmployee,
  getEmployeebyId,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.get("/", getAllEmployee);

router.post("/", createEmployee);

router.get("/:id", getEmployeebyId);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;
